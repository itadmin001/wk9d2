import * as _React  from 'react'
import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, off, remove, update } from 'firebase/database'
import { Box,Button,Stack,Typography,Alert,Snackbar} from '@mui/material'
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { theme } from '../../Theme/themes'
import { ShopState } from "../../hooks"
import { AlertMessageType } from '../Auth'
import { ApiCalls } from '../../api'
import { useGetOrder } from '../../hooks'
import { shopStyles } from '../Shop'
import { NavBar } from '../SharedComponents'
import { Order } from '../Order';

export interface CreateState{
    customer:string
    order: ShopState[]
}

export const Cart = () =>{
    const userId = localStorage.getItem('token')
    const db = getDatabase()
    const cartRef = ref(db, `carts/${userId}/`)
    const { orderData } = useGetOrder() 
    const [ currentCart, setCart ] = useState<ShopState[]>([])
    const [ openAlert, setAlertOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<AlertMessageType>()
     
    useEffect(() =>{

        onValue(cartRef, (snapshot) =>{
            const data = snapshot.val()
            let cartList = []

            if (data){
                for (let [key,value] of Object.entries(data)){
                    let cartItem = value as ShopState
                    cartItem['id'] = key
                    cartList.push(cartItem)
                }
            }

            setCart(cartList as ShopState[])
        })
        return () =>{

            off(cartRef)
        }

    }, [])

    const checkout = async () =>{

        let data: CreateState = {
            "customer": userId as string,
            "order": currentCart
        }

        const response = await ApiCalls.createOrder(data)

        if (response.status === 200){
            remove(cartRef)
            .then(() =>{
                console.log("Cart cleared")
                setMessage('Order Processed')
                setMessageType('success')
                setAlertOpen(true)
            })
            .catch((error) =>{
                console.log("Processing Error: " + error.message)
                setMessage(error.message)
                setMessageType('error')
                setAlertOpen(true)
            })
        } else {
            setMessage('There was an issue during checkout ')
            setMessageType('error')
            setAlertOpen(true)
        }

    }

    const updateQuantity = async (id: string, changeQuant: string) =>{

        const index = currentCart.findIndex((cart) => cart.id === id)
        const updatedData = [...currentCart]
        if (changeQuant === 'dec'){
            updatedData[index].quantity -= 1
        } else {
            updatedData[index].quantity += 1 
        }

        setCart(updatedData)
    }

    const updateCart = async ( cartItem: ShopState ) =>{

        const itemRef = ref(db, `carts/${userId}/${cartItem.id}`)

        update(itemRef, {
            quantity: cartItem.quantity 
        })
        .then(() =>{
            setMessage('Cart Updated')
            setMessageType('success')
            setAlertOpen(true)
        })
        .catch((error) =>{
            console.log("Cart update error: ", + error.message)
            setMessage(error.message)
            setMessageType('error')
            setAlertOpen(true)
        })
    }

    const deleteItem = async ( cartItem: ShopState ) =>{

        const itemRef = ref(db, `carts/${userId}/${cartItem.id}`)

        remove(itemRef)
        .then(() =>{
            setMessage('Cart item deleted')
            setMessageType('success')
            setAlertOpen(true)
        })
        .catch((error) =>{
            console.log("Error deleting item: ", + error.message)
            setMessage(error.message)
            setMessageType('error')
            setAlertOpen(true)
        })

    }


    return (
        <Box sx={shopStyles.main} >
            <NavBar />
            <Stack direction = 'column' sx={shopStyles.main}>
                <Stack direction = 'row' sx={{alignItems: 'center', marginTop: '100px', marginLeft: '200px'}}>
                    <Typography
                        variant = 'h4'
                        sx = {{marginRight: '20px'}}
                    >
                        Your Cart
                    </Typography>
                    <Button color = 'primary' variant = 'contained' onClick={ checkout }>Checkout 🪴</Button>
                </Stack>
                <Grid container spacing={3} sx={shopStyles.grid}>
                    {currentCart.map((shop: ShopState, index: number) => (
                        <Grid item key={index} xs={12} md={6} lg={4}>
                            <Card sx={shopStyles.card}>
                            <CardMedia component='img' sx={shopStyles.cardMedia} image={shop.image} alt={shop.name}/>
                            <CardContent>
                                <Stack direction = 'column' justifyContent='space-between' alignItems='center'>
                                    <Accordion sx={{color: 'white', backgroundColor: theme.palette.secondary.dark }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{color:'#fff'}} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>{shop.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>{shop.description}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Stack direction ='row' alignItems='center' justifyContent='space-between'>
                                        <Button
                                            size='large'
                                            variant='text'
                                            onClick={()=>{updateQuantity(shop.id, 'dec')}}
                                        >-</Button>
                                        <Typography variant = 'h6' sx={{color:theme.palette.primary.main}}>
                                            {shop.quantity}
                                        </Typography>
                                        <Button
                                            size='large'
                                            variant='text'
                                            onClick={()=>{updateQuantity(shop.id, 'inc')}}
                                        >+</Button>
                                    </Stack>
                                    <Button
                                        size='medium'
                                        variant='outlined'
                                        onClick={()=>{updateCart(shop)}}
                                        sx={shopStyles.button}
                                    >
                                        Update Quantity - ${(shop.quantity * parseFloat(shop.price)).toFixed(2)}
                                    </Button>
                                    <Button
                                        size='medium'
                                        variant='outlined'
                                        onClick={()=>{deleteItem(shop)}}
                                        sx={shopStyles.button}>Delete Item</Button>
                                </Stack>
                            </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Stack direction = 'column' sx={{width: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Typography variant = 'h4' sx = {{ marginTop: '100px', marginBottom: '100px'}}>Orders</Typography>
                <Order />
                </Stack>
            </Stack>
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={()=> setAlertOpen(false)}>
                <Alert severity = {messageType}>{message}</Alert>
            </Snackbar>
        </Box>
    )
}