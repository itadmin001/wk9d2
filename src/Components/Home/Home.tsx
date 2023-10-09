import React from "react";
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; 


// internal imports
import { NavBar } from '../SharedComponents';

interface Props{
    title:string
}

import header_image from '../../assets/Images/house.jpg'
const Root = styled('div')({
    padding:0,
    margin:0
})

const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${header_image});`,
    width:'100%',
    height:'100%',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'top top 5px',
    position:'absolute',
    marginTop:'10px'
})

const MainText = styled('div')({
    textAlign:'center',
    fontSize:'3em',
    position:'relative',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    color:'white'
})
const MainSubText = styled('div')({
    textAlign:'center',
    fontSize:'3em',
    position:'relative',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    color:'white'
})



export const Home = (props: Props) => {

    return(
        <Root>
            <NavBar />
            <Main>
                <MainText>
                    <h1>{props.title}</h1>
                    <Button sx = {{ marginTop:'10px', marginRight:'10px' }} component={Link} to={'/register'} variant='contained'>Sign Up</Button>
                    <Button sx = {{ marginTop:'10px' }} component={Link} to={'/auth'} variant='contained'>Log In</Button>
                </MainText>
                <MainSubText><h4>and property tracker</h4></MainSubText>
            </Main>
        </Root>
    )
}