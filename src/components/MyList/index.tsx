import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ClassNameProps, StyleProps, colors } from '../../styles'
import { SuperHero } from '../../core'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'
import { HeroCard } from '../HeroCard'
import cx from 'classnames'
import { PowerStat } from '../PowerStat'
import { Typography } from '@material-ui/core';

interface Props extends ClassNameProps, StyleProps {}

export const MyList: FC<Props> = ({ className, style }) => {
  const dispatch = useDispatch()
  const myList: Record<string, SuperHero> = useSelector((state: RootState) => state.heroReducer.myList) || []

  // console.log('myList: ', myList)

  const getAverageAttrs = () => {
    const result = {
      combat: '',
      durability: '',
      intelligence: '',
      power: '',
      speed: '',
      strength: ''
    }

    for (const superhero of Object.values(myList)) {
      console.log('superhero: ', superhero)
    }

    return result
  }

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

  const myListAverages = getAverageAttrs()

  return (
    <div className={cx(classes.container, className)} style={style}>
      {heroesInList?.length ? (
        <div className={classes.sectionRow}>
          <PowerStat label={'Combat'} value={myListAverages.combat} />
          <PowerStat label={'Durability'} value={myListAverages.durability} />
          <PowerStat label={'Intelligence'} value={myListAverages.intelligence} />
          <PowerStat label={'Power'} value={myListAverages.power} />
          <PowerStat label={'Speed'} value={myListAverages.speed} />
          <PowerStat label={'Strength'} value={myListAverages.strength} />
        </div>
      ) : null}
      <div className={classes.cardWrapper}>
        {heroesInList?.length ? heroesInList.map((superhero: SuperHero) => {
          return (
            <HeroCard
              superhero={superhero}
              addToList={() => handleListUpdate(superhero)}
              openSidePanel={() => dispatch({ type: 'SET_SELECTED_SUPERHEROES', data: superhero })}
              isActive={!!myList[superhero.id]}
            />
          )
        }) : <Typography className={classes.noList}>{'Add Heroes To Your List'}</Typography>}
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: '36px 14px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    backgroundColor: colors.black,
  },
  cardWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 18,
    paddingTop: 26
  },
  sectionRow: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  noList: {
    color: colors.red,
    margin: '0 auto',
    fontSize: 24,
    fontWeight: 500
  }
}))