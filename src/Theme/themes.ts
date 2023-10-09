import {createTheme} from '@mui/material'

export const theme = createTheme({
    typography: {
        fontFamily: 'Open Sans, HelveticaNeue, Helvetica Neue, Helvetica, Arial, sans-serif'
    },
    palette: {
        primary: {
            main: '#42A5F5'
        },
        secondary: {
            main: '#BA68C8',
            dark: '#464646'
        },
        info : {
            main: '#03A9F4'
        }
    }
})