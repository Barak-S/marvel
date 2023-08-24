import React, { FC, useState, useCallback, ChangeEvent, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { StyleProps } from '../../styles'
import { FormInput } from '../../components/Input'
import debounce from 'lodash/debounce'
import { getSuperHerosByName, SuperHero } from '../../core'
import BackgroundImage from '../../assets/images/Marvel-Bg.jpeg'
import { CircularProgress } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'
import { SidePanel, HeroCard, MyList } from '../../components'

type Props = StyleProps;

const Home: FC<Props> = ({ style }) => {
  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>()
  const superheroes: SuperHero[] = useSelector((state: RootState) => state.heroReducer.superheroes) || []
  const selectedHero: SuperHero = useSelector((state: RootState) => state.heroReducer.selectedHero) || {}
  const isMyListOpen: boolean = useSelector((state: RootState) => state.heroReducer.isMyListOpen) || false
  const myList: Record<string, SuperHero> = useSelector((state: RootState) => state.heroReducer.myList) || []

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }
  const debouncedChangeHandler = useCallback(
    debounce(handleChange, 1500)
  , [])

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        setIsLoading(true)
        const data = await getSuperHerosByName(searchTerm)
        dispatch({ type: 'SET_ALL_SUPERHEROES', data: data.results })
        setIsLoading(false)
      }
    }
    fetchData()
  }, [searchTerm])

  const handleListUpdate = (superhero: SuperHero) => {
    let newList = {...myList}
    if (myList[superhero.id]) {
      delete newList[superhero.id]
    } else {
      newList = {...newList, [superhero.id]: superhero}
    }
    dispatch({ type: 'SET_LIST', data: newList })
  }

  const classes = useStyles()

  return (
    <div
      className={classes.container}
      style={{
        backgroundImage: !superheroes?.length ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(255,255,255,0.5)), url(${BackgroundImage})` : '',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <MyList
        className={classes.myList}
        style={{
          transform: isMyListOpen ? 'translateY(0%)' : 'translateY(-100%)'
        }}
      />
      <div className={classes.searchContainer}>
        <FormInput
          type="text"
          onChange={debouncedChangeHandler}
          placeholder="Search a superhero..."
          className={classes.input}
        />
        <div className={classes.resultsContainer}>
          {superheroes?.length ? superheroes.map((superhero: SuperHero) => {
            return (
              <HeroCard
                superhero={superhero}
                openSidePanel={() => dispatch({ type: 'SET_SELECTED_SUPERHEROES', data: superhero })}
                isActive={!!myList[superhero.id]}
                addToList={() => handleListUpdate(superhero)}
                disabled={Object.keys(myList)?.length === 6}
              />
            )
          }) : isLoading ? (
            <CircularProgress className={classes.loading} />
          ) : null}
        </div>
      </div>
      <SidePanel
        selectedHero={selectedHero}
        onClose={() => dispatch({ type: 'SET_SELECTED_SUPERHEROES', data: null })}
        addToList={(superhero) => handleListUpdate(superhero)}
        isActive={!!myList[selectedHero.id]}
        disabled={Object.keys(myList)?.length === 6}
      />
    </div>
  )
}



const useStyles = makeStyles(theme => ({
  container: {
    padding: '112px 14px',
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#852324',
    overflow: 'hidden'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  resultsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width:  '100%',
    marginTop: 65,
    gap: 18,
    justifyContent: 'center',
    overflow: 'scroll',
    height: 'calc(100vh - 256px)',
    paddingBottom: 65,
    [theme.breakpoints.down('sm')]: {
      marginTop: 35,
      height: 'calc(100vh - 203px)',
    }
  },
  scrollUp: {
    transform: 'translateY(-100vh)'
  },
  input: {
    width: 500,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  loading: {
    margin: '0 auto'
  },
  myList: {
    position: 'absolute',
    top: 86,
    zIndex: 3,
    transition: '0.3s ease',
    [theme.breakpoints.down('sm')]: {
      top: 50,
    }
  }
}))

export default Home