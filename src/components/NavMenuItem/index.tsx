import React, { FC } from 'react'
import { colors, StyleProps } from '../../styles'
import { makeStyles, Theme } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

interface MenuItemProps extends StyleProps {
  label?: string;
  path?: string;
  handleClick?: ()=>void;
  isOpen: boolean;
  notifCount?: number;
}

const NavMenuItem: FC<MenuItemProps> = ({ label, handleClick, isOpen, path, notifCount, style }) => {
  const classes = useStyles()
  return (
    <Link
      onClick={handleClick && handleClick}
      style={style}
      className={classes.menuItem}
      to={path || ''}
    >
      {isOpen ? <BiChevronUp className={classes.chevron} /> : <BiChevronDown className={classes.chevron} />}
      {label}
      {notifCount ? (
        <div className={classes.myListNum}>
          {notifCount}
        </div>
      ) : null}
    </Link>
  )
}

  const useStyles = makeStyles((theme: Theme) => ({
    menuItem: {
      textTransform: 'uppercase',
      paddingBottom: 3,
      textDecoration: 'none',
      textShadow: `0 0 3px ${colors.black}`,
      fontSize: 19,
      fontWeight: 500,
      color: colors.white,
      margin: '0px 12.5px',
      cursor: 'pointer',
      backgroundImage: `linear-gradient(${colors.red}, ${colors.red}), linear-gradient(transparent, transparent)`,
      backgroundSize: '0 3px, auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center bottom',
      transition: 'all .2s ease-out',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundSize: '100% 3px, auto',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 16,
        margin: '6',
        color: colors.white,
        textShadow: 'none'
      }
    },
    chevron: {
      marginRight: 6,
    },
    myListNum: {
      backgroundColor: colors.red,
      color: colors.white,
      height: 20,
      width: 20,
      borderRadius: '50%',
      fontWeight: 500,
      fontSize: 12,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginTop: -3,
    }
  }))

  export default NavMenuItem
