import React from "react";
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import '../../index.css'


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
    top:'30%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    color:'white'
})
const MainSubText = styled('div')({
    textAlign:'center',
    fontSize:'3em',
    position:'relative',
    top:'30%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    color:'white'
})

export const HomePageCard = ({})=>{
    return (
      <>
        <section className="container pt-3 mb-3 card-section">
          <div className="row pt-5 mt-30">
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <div className="card box-shadow">
                <div className="home-card-div box-shadow bg-white rounded-circle mx-auto text-center">
                  <i className="bi bi-calculator-fill head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">
                    What is an ROI calculator?
                  </h3>
                  <p className="card-text text-sm">
                    An ROI Calculator is a tool that simplifies the calculation
                    of return on investment.
                  </p>
                  <span className="text-sm text-uppercase font-weight-bold learn-more">
                    Learn More&nbsp;<i className="fe-icon-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <div className="card box-shadow">
                <div className="home-card-div box-shadow bg-white rounded-circle mx-auto text-center">
                  <i className="fa fa-user-circle-o fa-1x head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">Importance of ROI</h3>
                  <div className="spacer"></div>
                  <p className="card-text text-sm">
                    Financial estimates of the profitability of your investment
                    show whether the initiative is worth it.
                  </p>
                  <span className="text-sm text-uppercase font-weight-bold learn-more">
                    Learn More&nbsp;<i className="fe-icon-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <div className="card box-shadow">
                <div className="home-card-div box-shadow bg-white rounded-circle mx-auto text-center">
                <i className="fa fa-money head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">
                    Benefits of Calculating ROI
                  </h3>
                  <p className="card-text text-sm">
                    From saving money to understanding market trends,
                    calculating ROI can help make your business stronger and
                    more successful.
                  </p>
                  <span className="text-sm text-uppercase font-weight-bold learn-more">
                    Learn More&nbsp;<i className="fe-icon-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export const Home = (props: Props) => {

    return(
        <Root>
            <NavBar />
            <Main>
                <MainText>
                    <h1 className="main-title">{props.title}</h1>
                    <Button sx = {{ marginTop:'10px', marginRight:'10px' }} component={Link} to={'/register'} variant='contained'>Sign Up</Button>
                    <Button sx = {{ marginTop:'10px' }} component={Link} to={'/auth'} variant='contained'>Log In</Button>
                </MainText>
                <MainSubText><h1>and property tracker</h1></MainSubText>
                <MainSubText>
                    <HomePageCard />
                </MainSubText>
                
            </Main>
        </Root>
    )
}