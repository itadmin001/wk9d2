import * as React from 'react'
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Snackbar, Stack, Typography, Alert,Divider,Dialog,DialogContent} from '@mui/material'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

import { NavBar } from '../SharedComponents';
import { InputText, InputPassword } from '../SharedComponents/Inputs'
import { AlertMessageType } from '../Auth';
import googleButton from '../../assets/Images/sign-in-with-google-icon-3.jpg'

interface SubmitProps{
    email:string
    password:string
}

interface ButtonProps{
    open:boolean
    onClick:()=>void
}

const GoogleButton = (props:ButtonProps) => {
    
    
    const auth = getAuth()
    const [ open, setMessageOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<AlertMessageType>()
    const navigate = useNavigate()
    const [ signInWithGoogle, user, loading, error ] = useSignInWithGoogle(auth)



    const login = async()=>{
        await signInWithGoogle()

        localStorage.setItem('auth','true')

        onAuthStateChanged(auth,(user)=>{
            if(user){
                localStorage.setItem('user',user.email || "")
                localStorage.setItem('token',user.uid || "")

                setMessage(`${user.email} logged in`)
                setMessageType('success')
                setMessageOpen(true)
                setTimeout(()=>{navigate('/')},2000)
            }
        })

        if(error){
            setMessage(error.message)
            setMessageType('error')
            setMessageOpen(true)
        }
    }


    return(
        <Box>
            <Button variant='contained' color='info' size='medium' sx={{marginBottom:'15px'}} onClick={login}><img src={googleButton} alt="" width="250px"/></Button>
            <Snackbar open={open} autoHideDuration={2000} onClose={()=>setMessageOpen(false)}>
                <Alert severity={messageType}>{message}</Alert>
            </Snackbar>
        </Box>
    )

}


const SignIn = ()=>{
    
    const auth = getAuth()
    const [ open, setMessageOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<AlertMessageType>()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<SubmitProps>({});


    const onSubmit:SubmitHandler<SubmitProps> =async (data, e) => {
        if(e) e.preventDefault()

        signInWithEmailAndPassword(auth,data.email,data.password)
        .then((userCredential)=>{
            localStorage.setItem('auth','true')
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    localStorage.setItem('user',user.uid || "")
                    localStorage.setItem('token', user.email || "")
                }
            })

            const user = userCredential.user
            setMessage(`${user.email} logged in`)
            setMessageType('success')
            setMessageOpen(true)
            setTimeout(() => {navigate('/')}, 2000);
        })

        .catch((error)=>{
            const errorCode = error.code
            const errorMessage = error.message
            setMessage(errorMessage)
            setMessageType('error')
            setMessageOpen(true)
        })
    }

    return(
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign In</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Address' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar open={open} autoHideDuration={2000} onClose={()=> setMessageOpen(false)}>
                <Alert severity = {messageType}>{message}</Alert>
            </Snackbar>
        </Box>
    )
}


const SignUp = () => {

    const auth = getAuth()
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<AlertMessageType>()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<SubmitProps>({});


    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 

        console.log(data.email, data.password)
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            localStorage.setItem('auth', 'true')

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    localStorage.setItem('token', user.uid || '')
                    localStorage.setItem('user', user.email || '') 
                }
            })


            const user = userCredential.user;
            setMessage(`${user.email} logged in`)
            setMessageType('success')
            setOpen(true)
            setTimeout(()=>{navigate('/')}, 2000)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setMessage(errorMessage)
            setMessageType('error')
            setOpen(true)
        });
    }

    return (
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign Up</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email Address' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={()=> setOpen(false)}>
                <Alert severity = {messageType}>{message}</Alert>
            </Snackbar>
        </Box>
    )

}

export const Register = ()=>{

    const [ open, setOpen ] = useState(false)
    const navigate = useNavigate();
    const [ signType, setSignType ] = useState<string>()

    const handleSnackClose = () => {
        setOpen(false)
        navigate('/')
    }


    return (
        <Box>
            <NavBar />
            <Box>
                <Stack direction = 'column' alignItems = 'center' textAlign = 'center' marginTop='100px' sx={{backgroundColor:'#faf9f6'}}>
                    <GoogleButton open = {open} onClick = {handleSnackClose} />
                    <Divider/>
                    <Stack>
                    <Button variant='contained' color='info' size='medium' sx={{marginBottom:'15px',width:'282px',color:'#fff',fontWeight:'bold'}}>Email Login In</Button>
                        <Button variant='contained' color='info' size='medium' sx={{color:'#fff',fontWeight:'bold'}} onClick = {()=>{setOpen(true); setSignType('signup')}}>
                                Email Sign Up
                            </Button>
                    </Stack>
                </Stack>
                <Dialog open={open} onClose = {()=>{setOpen(false)}}>
                    <DialogContent>
                        {signType === 'signin' ? <SignIn/> : <SignUp/>}
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
        
    )
}