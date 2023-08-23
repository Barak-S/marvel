import React, { FC, useState, useCallback, ChangeEvent, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { StyleProps, colors } from '../../styles'
import { FormInput } from '../../components/Input'
import debounce from 'lodash/debounce'
import { getSuperHerosByName, SuperHero } from '../../core'
import BackgroundImage from '../../assets/images/Marvel-Bg.jpeg'
import { Typography, CircularProgress } from '@material-ui/core'
import cx from 'classnames'
import { BsArrowBarLeft, BsFillBookmarkFill } from 'react-icons/bs'


type Props = StyleProps;

const Home: FC<Props> = ({ style }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>()
  const [superheroes, setSuperheroes] = useState<SuperHero[]>()
  const [superheroesSelected, setSuperheroesSelected] = useState<Record<string, SuperHero>>()
  const [selectedHero, setSelectedHero] = useState<SuperHero | null>()

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
        setSuperheroes(data.results)
        setIsLoading(false)
      }
      else {
        setSuperheroes([])
      }
    }
    fetchData()
  }, [searchTerm])

  const classes = useStyles()

  return (
    <div className={classes.container}>
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
              <div
                key={superhero.id}
                className={classes.heroCard}
                onClick={() => setSelectedHero(superhero)}
                style={{
                  backgroundImage: `url(${superhero.image.url})`
                }}
              >
                <div className={classes.heroDetails}>
                  <Typography className={classes.heroName}>{superhero.name}</Typography>
                  <BsFillBookmarkFill size={22} color={colors.red} />
                </div>
              </div>
            )
          }) : isLoading ? (
            <CircularProgress className={classes.loading} />
          ) : 'no results'}
        </div>
      </div>
      <div
        className={classes.sidePanel}
        style={{
          transform: selectedHero ? 'translateX(0%)' : 'translateX(100%)'
        }}
      >
        <div className={classes.sidePanelHeader}>
          <BsArrowBarLeft
            className={classes.backButton}
            size={25}
            color={colors.white}
            onClick={() => setSelectedHero(null)}
          />
        </div>
        <div
          className={classes.selectedHeroDetails}
          style={{
            backgroundImage: `url(${selectedHero?.image.url})`
          }}
        >
          <div className={cx(classes.heroDetails, classes.heroDetailsLarge)}>
            <Typography className={classes.selectedHeroName}>{selectedHero?.name}</Typography>
          </div>
          <div className={classes.sectionDetailsWrapper}>
            <Typography className={classes.sectionTitle}>Biography</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Full Name</strong>{selectedHero?.biography['full-name'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Place of Birth</strong>{selectedHero?.biography['place-of-birth'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Alter Egos</strong>{selectedHero?.biography['alter-egos'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Aliases</strong>{selectedHero?.biography['aliases'].map(item => item)}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>First Appearance</strong>{selectedHero?.biography['first-appearance'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Publisher</strong>{selectedHero?.biography['publisher'] || 'N/A'}</Typography>

            <Typography className={cx(classes.sectionTitle, classes.sectionTitleSub)}>Apperance</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Gender</strong>{selectedHero?.appearance['gender'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Height</strong>{selectedHero?.appearance['height'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Weight</strong>{selectedHero?.appearance['weight'].map(item => item)}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Eye Color</strong>{selectedHero?.appearance['eye-color'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Hair Color</strong>{selectedHero?.appearance['hair-color'] || 'N/A'}</Typography>

            <Typography className={cx(classes.sectionTitle, classes.sectionTitleSub)}>Power Stats</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Combat</strong>{selectedHero?.powerstats['combat'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Durability</strong>{selectedHero?.powerstats['durability'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Intelligence</strong>{selectedHero?.powerstats['intelligence'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Power</strong>{selectedHero?.powerstats['power'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Speed</strong>{selectedHero?.powerstats['speed'] || 'N/A'}</Typography>
            <Typography className={classes.sectionDetails}><strong style={{ color: colors.red, fontWeight: 500, paddingRight: 8 }}>Strength</strong>{selectedHero?.powerstats['strength'] || 'N/A'}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: '136px 14px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#EC1C25'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2,
    alignItems: 'center'
  },
  resultsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width:  '100%',
    paddingTop: 65,
    gap: 18,
    justifyContent: 'center',
  },
  scrollUp: {
    transform: 'translateY(-100vh)'
  },
  input: {
    width: 500,
  },
  loading: {
    margin: '0 auto'
  },
  heroCard: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 14,
    width: 244,
    height: 322,
    backgroundSize: 'cover',
    position: 'relative',
    cursor: 'pointer'
  },
  heroDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'linear-gradient(to bottom, transparent 5%, black 60%)',
    padding: '20px 10px',
    paddingTop: 54,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heroDetailsLarge: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: 18,
    paddingBottom: 16,
  },
  heroName: {
    color: colors.white,
    fontSize: 22
  },
  sidePanel: {
    position: 'absolute',
    height: 'calc(100% - 86px)',
    width: '55%',
    top: 86,
    bottom: 0,
    right: 0,
    zIndex: 2,
    transition: '0.3s ease-out',
    backgroundColor: colors.black,
    boxShadow: '-10px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  sidePanelHeader: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 0,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 10,
    zIndex: 99,
    cursor: 'pointer'
  },
  selectedHeroDetails: {
    height: '50vh',
    width: '100%',
    backgroundSize: 'cover',
    position: 'relative'
  },
  selectedHeroName: {
    fontSize: 36,
    color: colors.white,
    fontWeight: 600
  },
  sectionTitle: {
    fontSize: 23,
    color: colors.red,
    paddingBottom: 10,
    fontWeight: 500
  },
  sectionTitleSub: {
    paddingTop: 24
  },
  sectionDetailsWrapper: {
    padding: '0px 18px',
    paddingTop: '50vh',
  },
  sectionDetails: {
    color: colors.white,
    fontSize: 19,
    paddingLeft: 12
  }
}))

export default Home