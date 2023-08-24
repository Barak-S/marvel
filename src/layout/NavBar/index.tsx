import React, { FC } from 'react'
import { colors, StyleProps } from '../../styles'
import { AppBar, Container, useMediaQuery, useTheme, makeStyles } from '@material-ui/core'
import Logo from '../../assets/images/Marvel-Comics-logo.png'
import NavMenuItem from '../../components/NavMenuItem'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'
import { SuperHero } from '../../core'

type Props = StyleProps

const NavBarLayout: FC<Props> = ({ style }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isMyListOpen: boolean = useSelector((state: RootState) => state.heroReducer.isMyListOpen) || false
  const myList: SuperHero[] = useSelector((state: RootState) => state.heroReducer.myList) || []

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Container className={classes.container}>
        <div className={classes.navigationBar}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              onClick={()=> dispatch({ type: 'SET_ALL_SUPERHEROES', data: [] })}
              src={Logo}
              style={{
                height: isMobile ? 52 : 55,
                cursor: 'pointer' ,
              }}
            />
          </div>
          <div className={classes.menu}>
            <NavMenuItem
              label={'My Team'}
              handleClick={() => dispatch({ type: 'TOGGLE_MY_LIST', data: !isMyListOpen })}
              isOpen={isMyListOpen}
              notifCount={Object.keys(myList)?.length || 0}
            />
          </div>
        </div>
      </Container>
    </AppBar>
  )
}

  const useStyles = makeStyles(theme => ({
    container: {
      height: 86,
      maxWidth: 1730,
      display: 'flex',
      width: '100%',
      zIndex: 1,
      [theme.breakpoints.down('sm')]:{
        height: 50
      }
    },
    appBar: {
      boxShadow: 'none',
      backgroundColor: colors.black,
    },
    navigationBar: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      height: '100%',
      position: 'relative',
    },
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
      [theme.breakpoints.down('sm')]: {
        fontSize: 26,
        margin: '12px 27px',
        marginLeft: 45,
        color: colors.white,
        textShadow: 'none'
      }
    },
    menu: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        alignItems: 'center'
      }
    }
  }))

export default NavBarLayout