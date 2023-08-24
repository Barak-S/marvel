import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ClassNameProps, colors } from '../../styles'
import { SuperHero } from '../../core'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'
import { HeroCard } from '../HeroCard'
import cx from 'classnames'

type Props = ClassNameProps;

export const MyList: FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const myList: Record<string, SuperHero> = useSelector((state: RootState) => state.heroReducer.myList) || []
  // const selectedHero: SuperHero = useSelector((state: RootState) => state.heroReducer.selectedHero) || {}

  console.log('myList: ', myList)

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

  const heroesInList = Object.values(myList)

  return (
    <div className={cx(classes.container, className)}>
      {/* get averages of team */}
      {heroesInList?.length ? heroesInList.map((superhero: SuperHero) => {
        return (
          <HeroCard
            superhero={superhero}
            addToList={() => handleListUpdate(superhero)}
            openSidePanel={() => dispatch({ type: 'SET_SELECTED_SUPERHEROES', data: superhero })}
            isActive={!!myList[superhero.id]}
          />
        )
      }) : 'Add Heroes To Your List'}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: '36px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: '500px',
    height: '100%',
    position: 'relative',
    backgroundColor: colors.black,
    gap: 18,
  }
}))