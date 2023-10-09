import React from 'react'
import { styled } from '@mui/system';

import { NavBar } from '../SharedComponents';


const Root = styled('div')({
    padding:0,
    margin:0
})

const Main = styled('main')({
    width:'100%',
    height:'100%',
    marginTop:'10px'
})

const MainText = styled('div')({
    marginTop:'5%',
    margin:'5% auto'    
})

export const Properties = () => {


    return (
        <Root>
            <NavBar />
            <Main>
                <MainText>
                    <h1 style={{textAlign:'center'}}>My Properties</h1>
                </MainText>
            </Main>
        </Root>
    )
}