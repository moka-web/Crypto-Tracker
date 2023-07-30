import React, { useEffect, useState,useContext } from 'react'
import CryptoCurrencyContext from '../cryptoContext';
import axios from 'axios';
import { Button, CircularProgress, Container } from '@mui/material';
import { HistoricalChart } from '../api/apiGecko';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import moment from 'moment/moment';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  )




export const CoinInfo = ({id}) => {
    const [days, setDays] = useState(1);
    const [chart, setChart] = useState()
     const [flag,setFlag] = useState(false)
    const {currency, symbol} = useContext(CryptoCurrencyContext);

      

    const fetchHistoricallChart = async (id , days , currency)=>{
     
        try {
            console.log("entra")
            setFlag(true)
            const {data} = await axios.get(HistoricalChart(id,days,currency))
            const charData= data.prices.map((value)=>({ x: value[0] , y: value[1].toFixed(2)}));
            setChart(charData)
            console.log(chart)
        } catch (error) {
            console.log(error.message)
        }
      }

        useEffect(()=>{
            try {
                fetchHistoricallChart(id,days,currency)        
            } catch (error) {
                console.log(error.message)                
            }
            console.log(chart)
            //eslint-disable-next-line react-hooks/exhaustive-deps
        },[id,days,currency])


      const options={
        responsive: true
      }


  return (
    <Container sx={{width:"100%"}}>
    { !chart || flag === false ? (<CircularProgress></CircularProgress>) : 
    (<Line options={options} data={{
        labels: chart && chart.map(value=>moment(value.x).format('MMMDD')),
        datasets:[{
            label:id,
            fill:true,
            data:chart.map(value=>value.y),
            borderColor:"gold",
            backgroundColor:"white"
        }]
      }}></Line>)}  
      <div style={{display:"flex" , justifyContent:"space-between" }}>
      <Button sx={{ mt:1,border:"1px solid white" , color:"gold", fontFamily:"Montserrat", fontSize:"0.5rem"}} onClick={()=>{setDays(7)}} >last 7 days</Button>
      <Button sx={{  mt:1,border:"1px solid white" , color:"gold", fontFamily:"Montserrat", fontSize:"0.5rem"}} onClick={()=>{setDays(30)}} >last month</Button>
      <Button sx={{ mt:1, border:"1px solid white" , color:"gold", fontFamily:"Montserrat", fontSize:"0.5rem"}} onClick={()=>{setDays(90)}} >last 3 months</Button>
      <Button sx={{  mt:1,border:"1px solid white" , color:"gold", fontFamily:"Montserrat", fontSize:"0.5rem"}} onClick={()=>{setDays(365)}} >last year</Button>
      </div>
  </Container>
  )
}

