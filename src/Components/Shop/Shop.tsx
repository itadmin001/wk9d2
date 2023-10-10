import * as React  from 'react' 
import { useState }  from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getDatabase, ref, push } from 'firebase/database' 
import {Box,Button,Dialog,DialogContent,DialogContentText,Stack,Typography,Snackbar,Alert} from '@mui/material'
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { NavBar } from '../SharedComponents'
import {  theme } from '../../Theme/themes'
import { useGetShop, ShopState } from '../../hooks'
import { InputText } from '../SharedComponents'
import { AlertMessageType } from '../Auth'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'   


export interface SubmitState {
    quantity: string
}

interface CartProps {
    cartItem: ShopState
}



export const shopStyles = {
    main: {
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        position: 'absolute',
        overflow: 'auto',
        paddingBottom: '100px'
    },
    grid: {
        marginTop: '25px', 
        marginRight: 'auto', 
        marginLeft: 'auto', 
        width: '70vw'
    },
    card: {
        width: "300px", 
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        borderRadius: '10px',
        border:'1px solid rgba(204,204,204,.5)'
    },
    cardMedia: {
        width: '95%',
        margin: 'auto',
        marginTop: '5px',
        aspectRatio: '1/1',
        borderRadius: '10px'
    },
    button: {
        borderRadius: '50px',
        height: '45px',
        width: '250px',
        marginTop: '10px'
    },
    stack: {
        width: '75%', 
        marginLeft: 'auto', 
        marginRight: 'auto'
    },
    typography: { 
        marginLeft: '15vw', 
        color: "white", 
        marginTop: '100px'
    }

}


const AddToCart = (cart: CartProps) => {
    const db = getDatabase() 
    const { register, handleSubmit } = useForm<SubmitState>({})
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<AlertMessageType>()
    
    const onSubmit: SubmitHandler<SubmitState> = async (data, event) => {
        if (event) event.preventDefault() 

        const userId = localStorage.getItem('token')
        const cartRef = ref(db, `carts/${userId}/`)

        let myCart = cart.cartItem

        if (myCart.quantity > parseInt(data.quantity)){
            myCart.quantity = parseInt(data.quantity)
        }

        push(cartRef, myCart)
        .then((newCartRef) => {
            setMessage(`Added ${myCart.name} to Cart`)
            setMessageType('success')
            setOpen(true)
        })
        .then(()=>{
            setTimeout(()=>{window.location.reload()}, 3000)
        })
        .catch((error) => {
            console.log("Error adding cart item: " + error.message)
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        })
    }

    return (
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor='quantity'>{cart.cartItem.name} </label>
                    <InputText {...register('quantity')} name='quantity' placeholder='How many?' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={()=> setOpen(false)}
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )

}

export const Shop = () => {
    const { shopData, getData } = useGetShop() 
    const [ currentShop, setCurrentShop ] = useState<ShopState>()
    const [ cartOpen, setCartOpen ] = useState(false)


    console.log(shopData)
    return (
        <Box sx={shopStyles.main} >
            <NavBar />
            <Typography variant='h4' sx={{color:'#000',marginTop:'100px',textAlign:'center',fontWeight:'bold'}}>Shop</Typography>
            <Grid container spacing={3} sx={shopStyles.grid}>
                {shopData.map((shop: ShopState, index: number) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card sx={shopStyles.card}>
                            <CardMedia component='img' sx={shopStyles.cardMedia} image={shop.image} alt={shop.name}/>
                            <CardContent>
                                <Stack direction = 'column' justifyContent='space-between' alignItems='center'>
                                    <Stack direction = 'row' alignItems='center' justifyContent='space-between'>
                                        <Accordion sx={{ color: 'white', backgroundColor: theme.palette.secondary.light }}>
                                            <AccordionSummary
                                                sx={{backgroundColor:theme.palette.secondary.dark,fontWeight:'bold'}}
                                                expandIcon={<ExpandMoreIcon sx={{color:'#fff' }} />}
                                                aria-controls='panel1a-content'
                                                id='panel1-header'>
                                            <Typography>{shop.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{backgroundColor:theme.palette.secondary.dark}}>
                                                <Typography>
                                                    {shop.description}
                                                </Typography>
                                            </AccordionDetails> 
                                        </Accordion>
                                    </Stack>
                                    <Button size='medium' variant='outlined' onClick = {()=>{setCurrentShop(shop); setCartOpen(true)}} sx={shopStyles.button}>
                                        Add to Cart - ${parseFloat(shop.price).toFixed(2)}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid> 
                ))}
            </Grid>
            <Dialog open={cartOpen} onClose={()=>{setCartOpen(false)}}>
                <DialogContent>
                    <DialogContentText>Add to Cart</DialogContentText>
                    <AddToCart cartItem = {currentShop as ShopState } />
                </DialogContent>
            </Dialog>
        </Box>
    )
}