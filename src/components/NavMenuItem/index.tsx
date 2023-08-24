import React, { FC } from 'react'
import { colors, StyleProps } from '../../styles'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

interface MenuItemProps extends StyleProps {
  label?: string;
  path?: string;
  handleClick?: ()=>void;
}

const NavMenuItem: FC<MenuItemProps> = ({ label, handleClick, path, style }) => {
  const classes = useStyles();
  return (
    <Link
      onClick={handleClick && handleClick}
      style={style}
      className={classes.menuItem}
      to={path || ''}
    >
      {label}
    </Link>
  )
}

  const useStyles = makeStyles(theme => ({
    menuItem: {
        textTransform: 'uppercase',
        display: 'inline-block',
        paddingBottom: 3,
        textDecoration: 'none',
        textShadow: `0 0 3px ${colors.black}`,
        fontSize: 19,
        fontWeight: 500,
        color: colors.white,
        margin: '0px 12.5px',
        cursor: 'pointer',
        backgroundImage: `linear-gradient(${colors.white}, ${colors.white}), linear-gradient(transparent, transparent)`,
        backgroundSize: '0 3px, auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        transition: 'all .2s ease-out',
        '&:hover': {
            backgroundSize: '100% 3px, auto',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: 16,
            margin: '12px 27px',
            marginLeft: 45,
            color: colors.white,
            textShadow: 'none'
        }
    }

  }))

  export default NavMenuItem
