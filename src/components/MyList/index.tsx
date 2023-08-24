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
interface Powerstats {
  combat: number;
  durability: number;
  intelligence: number;
  power: number;
  speed: number;
  strength: number;
}

export const MyList: FC<Props> = ({ className, style }) => {
  const dispatch = useDispatch()
  const myList: Record<string, SuperHero> = useSelector((state: RootState) => state.heroReducer.myList) || []

  const getAverageAttrs = () => {
    const result: Powerstats = {
      combat: 0,
      durability: 0,
      intelligence: 0,
      power: 0,
      speed: 0,
      strength: 0
    }

    const powers: Array<keyof Powerstats> = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength'];
    for (const superhero of Object.values(myList)) {
      powers.forEach((power) => {
        const combatNum = parseInt(superhero.powerstats[power] as any);
        if (!isNaN(combatNum)) {
          result[power] += combatNum;
        }
      })
    }
    powers.forEach((power) => {
      result[power] = Math.round((result[power] / (Object.keys(myList)?.length * 100)) * 100)
    })
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

  const myListAverages: Powerstats = getAverageAttrs()

  return (
    <div className={cx(classes.container, className)} style={style}>
      {heroesInList?.length ? (
        <div className={classes.sectionRow}>
          <PowerStat label={'Combat'} value={myListAverages.combat.toString()} />
          <PowerStat label={'Durability'} value={myListAverages.durability.toString()} />
          <PowerStat label={'Intelligence'} value={myListAverages.intelligence.toString()} />
          <PowerStat label={'Power'} value={myListAverages.power.toString()} />
          <PowerStat label={'Speed'} value={myListAverages.speed.toString()} />
          <PowerStat label={'Strength'} value={myListAverages.strength.toString()} />
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
    maxHeight: 'calc(100vh - 50px)',
    backgroundColor: colors.black,
    [theme.breakpoints.down('sm')]: {
      overflowY: 'auto'
    }
  },
  cardWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 18,
    paddingTop: 26,
    [theme.breakpoints.down('sm')]: {
      overflowY: 'auto'
    }
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