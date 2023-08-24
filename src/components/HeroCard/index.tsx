import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ClassNameProps, colors } from '../../styles'
import { SuperHero } from '../../core'
import { Typography, Tooltip, IconButton } from '@material-ui/core'
import { BsFillBookmarkFill } from 'react-icons/bs'
import cx from 'classnames'

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
        >{superhero.name}</Typography>
        <Tooltip placement="top" title={(disabled && !isActive) ? 'My list is full' : !isActive ? 'Add' : 'Remove'}>
          <IconButton>
            <BsFillBookmarkFill
              onClick={() => (disabled && !isActive) ? null : addToList()}
              size={22}
              color={isActive ? colors.red : colors.grey}
              style={{ opacity: (disabled && !isActive) ? 0.5 : 1, cursor: (disabled && !isActive) ? 'initial' : 'pointer' }}
            />
          </IconButton>
        </Tooltip>
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