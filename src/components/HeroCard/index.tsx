import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ClassNameProps, colors } from '../../styles'
import { SuperHero } from '../../core'
import { Typography } from '@material-ui/core'
import cx from 'classnames'
import { MyListToggle } from '../MyListToggle'

interface Props extends ClassNameProps {
  superhero: SuperHero;
  openSidePanel: () => void;
  addToList: () => void;
  isActive: boolean;
  disabled?: boolean;
}

export const HeroCard: FC<Props> = ({ superhero, addToList, openSidePanel, isActive, disabled, className }) => {
  const classes = useStyles()
  return (
    <div
      key={superhero.id}
      className={cx(classes.heroCard, className)}
      style={{
        backgroundImage: `url(${superhero.image.url})`,
      }}
    >
      <div className={classes.heroDetails}>
        <Typography
          className={classes.heroName}
          onClick={() => openSidePanel()}
        >
          {superhero.name}
        </Typography>
        <MyListToggle
          onClick={() => addToList()}
          isActive={isActive}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
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
  heroName: {
    color: colors.white,
    fontSize: 22,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))