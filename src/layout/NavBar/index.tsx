import React, { FC, useState } from 'react'
import { colors, StyleProps } from '../../styles'
import { AppBar, Container, useMediaQuery, useTheme, Button, makeStyles } from '@material-ui/core'
import Logo from '../../assets/images/Marvel-Comics-logo.png'
import { FiMenu, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import NavMenuItem from './components/NavMenuItem'

type Props = StyleProps

const NavBarLayout: FC<Props> = ({ style }) => {
    const theme = useTheme()
    const classes = useStyles()
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Container className={classes.container}>
                <div className={classes.navigationBar}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            onClick={()=> !isMobile ? history.push('/') : undefined}
                            src={Logo}
                            style={{
                                height: isMobile ? open ? 36 : 52 : 55,
                                cursor: 'pointer' ,
                                display: isMobile ? 'none' : 'initial'
                            }}
                        />
                    </div>
                    <NavMenuItem
                      label={'My Team'}
                    />
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
        // zIndex: 1,
        backgroundColor: colors.black,
    },
    navigationBar: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        [theme.breakpoints.down('sm')]:{
            justifyContent: 'start',
        }
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
    }

  }))

export default NavBarLayout