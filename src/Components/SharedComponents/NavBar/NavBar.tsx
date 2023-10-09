import React, { useState } from 'react'; 
import { signOut,getAuth } from 'firebase/auth'
import {
    Button,
    Drawer,
    ListItemButton,
    List,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Stack,
    Typography,
    Divider,
    CssBaseline,
    Box 
} from '@mui/material'; 
import { useNavigate } from 'react-router-dom'; 
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MenuIcon from '@mui/icons-material/Menu';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import { theme } from '../../../Theme/themes'

const menuWidth = 200

const menuStyles = {
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    appBarShift: {
        width: `calc(100% - ${menuWidth}px)`,
        marginLeft: menuWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    menu: {
        width: menuWidth,
        flexShrink: 0
    },
    menuPaper: {
        width: menuWidth
    },
    menuHeader: {
        display: 'flex',
        width: menuWidth,
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: 0
    },
    contentShift: {
        transition: theme.transitions.create('margin', { 
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    toolbar: {
        display: 'flex'
    },
    toolbarButton: {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.contrastText
    },
    signInStack: {
        position: 'absolute', 
        top: '20%', 
        right:'150px',
        color:'#000'
    }
}

export const NavBarSignInButton = () =>{
    const auth = getAuth()
    const myAuth = localStorage.getItem('auth')
    const navigate = useNavigate()

    const signInOutButton = async () =>{
        if (myAuth === 'false'){
            navigate('/auth')
        } else {
            await signOut(auth)
            localStorage.setItem('auth', 'false')
            localStorage.setItem('token', '')
            localStorage.setItem('user', '')
            navigate('/')
        }
    }

    return(
        <Button 
            variant = 'contained'
            color = 'info'
            size = 'large'
            sx = {{ marginLeft: '20px'}}
            onClick = { signInOutButton }
            >
            { myAuth==='false' ? "Sign In" : "Sign Out" }
        </Button>
    )
    
}

export const NavBar = () => {
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(false); 

    var email = localStorage.getItem('user')

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const navLinks = [
        {
            text: 'Home',
            icon: <HomeIcon/>,
            onClick: () => {navigate('/')}
        },
        {
            text: 'Sign In',
            icon: <LockOpenIcon />,
            onClick: () => {navigate('/auth')}
        },
        {
            text: 'Register',
            icon: <AppRegistrationIcon />,
            onClick: () => {navigate('/register')}
        },
        {
            text: 'My Properties',
            icon: <HolidayVillageIcon />,
            onClick: () => {navigate('/properties')}
        },
        {
            text: 'Shop',
            icon: <ShoppingBagIcon />,
            onClick: () => {navigate('/shop')}
        },
        {
            text: 'Cart',
            icon: <ShoppingCartIcon />,
            onClick: () => {navigate('/cart')}
        },
    ]

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar 
                sx={ open ? menuStyles.appBarShift : menuStyles.appBar }
                position = 'fixed'
            >
                <Toolbar sx={ menuStyles.toolbar }>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick = { handleDrawerOpen }
                        edge = 'start'
                        sx = { open ? menuStyles.hide : menuStyles.menuButton }
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={ menuStyles.signInStack }>
                    <Typography variant='body2' sx={{color: 'inherit'}}>
                    { localStorage.getItem('user') ? email : "" }
                    </Typography>
                    <NavBarSignInButton />
                    <Button 
                        variant = 'outlined'
                        color = 'secondary'
                        size = 'large'
                        sx = {{ marginLeft: '20px'}}
                        onClick = { () => {navigate('/register')}}>Register</Button>
                </Stack>
            </AppBar>
            <Drawer 
                sx = { open ? menuStyles.menu : menuStyles.hide }
                variant = 'persistent'
                anchor = 'left'
                open = {open}
            >
                <Box sx = { menuStyles.menuHeader }>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    { navLinks.map((item) => {
                        const { text, icon, onClick } = item; 
                        return (
                            <ListItemButton key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                                { icon }
                            </ListItemButton>
                        )
                    })}
                </List>
            </Drawer>
        </Box>
    )

}