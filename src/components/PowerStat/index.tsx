import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { StyleProps, colors } from '../../styles'
import { Typography, CircularProgress, useMediaQuery, useTheme, Theme } from '@material-ui/core'

interface Props extends StyleProps {
  value: string;
  label: string;
}

export const PowerStat: FC<Props> = ({ value, label, style }) => {
  const classes = useStyles()
  const theme: Theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const hasNoVal = () => {
    return !!(!value || value === 'N/A' || value === 'null')
  }
  return (
    <div className={classes.container} style={style}>
      <Typography className={classes.label}>{label}</Typography>
      {hasNoVal() ? (
        <Typography className={classes.noValue}>{'N/A'}</Typography>
      ) : (
        <>
          <CircularProgress size={isMobile ? 33 : 44} variant="determinate" value={parseInt(value)} />
          <Typography className={classes.value}>{value}</Typography>
        </>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  label: {
    fontSize: 26,
    color: colors.red,
    paddingBottom: 8,
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
    }
  },
  value: {
    color: colors.white,
    fontSize: 16,
  },
  noValue: {
    color: colors.white,
    fontSize: 24,
  }
}))