import { Box, Container, Typography, makeStyles, styled } from '@mui/material'
import React from 'react'
import backImage from "/crypto-back.jpg"
import {Carousel} from './carousel'
export const Banner = () => {

 

  
    return (

    <>
    <Box sx={{backgroundImage:"url('https://static.vecteezy.com/system/resources/previews/000/663/037/original/stock-market-trading-graph-vector.jpg')", backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        <Container sx={{height:"50vh",display:'flex',flexDirection:"column",paddingTop:5,justifyContent:'center'}} >
           
           <Box >
                <Typography variant='h3' sx={{fontWeight:"bold", color:"gold",fontFamily:"montserrat",textAlign:"start", }}>CryptoTracker</Typography>
                <Typography variant='h5' sx={{color:"#fff",textTransform:"capitalize",fontFamily:"montserrat"}}>All crypto currencys you can track!</Typography>
           </Box>
           <Box>
            
           </Box>
          <Carousel></Carousel>    
        </Container>
    </Box>


    </>
  )

}

