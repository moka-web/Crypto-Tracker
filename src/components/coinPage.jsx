import axios from "axios"
import { CoinList, HistoricalChart, SingleCoin } from "../api/apiGecko"
import { useContext, useEffect, useState } from "react"
import CryptoCurrencyContext from "../cryptoContext"
import { useParams } from "react-router-dom"
import { Box, LinearProgress, Typography } from "@mui/material"
import ReactHtmlParser from 'react-html-parser';
import { priceWithCommas } from "./carousel"
import { Line } from "react-chartjs-2"
import { CoinInfo } from "./CoinInfo"

export const CoinPage = () => {
    const {id} = useParams();
    const [coin , setCoin] = useState([]);
    const [days, setDays] = useState();
    const [chart, setChart] = useState()
    const {currency, symbol} = useContext(CryptoCurrencyContext);

    const fetchCoin = async() =>{
      try {
        const {data} = await axios.get(SingleCoin(id))
      setCoin(data)  
      } catch (error) {
        console.log(error.message)
      }
    }


    useEffect(()=>{
      fetchCoin()
      //eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency ])

     


  return (
    <div style={{display:"flex", margin:"5%"}} >
      <div style={{width:"40%"}} >
        {!coin ? (<LinearProgress sx={{backgroundColor:"gold", margin:"0 auto"}}></LinearProgress>) : (
         <>
        <img src={coin?.image?.large} alt={coin?.name} />
          <Typography>{coin?.name}</Typography>
          <Typography>{ReactHtmlParser(coin?.description?.en.split(". ")[0])}</Typography>
          <span>
            <Typography variant="h5">
              Rank :
            </Typography>
            <Typography variant="h5">
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span>
            <Typography variant="h5">
              Current Price :
            </Typography>
            <Typography variant="h5">
               {symbol}{priceWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])} 
            </Typography>
          </span>
          <span>
            <Typography variant="h5">
             Market Cap :
            </Typography>
            <Typography variant="h5">
               {symbol}{priceWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()])} 
            </Typography>
          </span>
          </> 
        )}
      </div>
      <div style={{width:"60%", padding:"5%"}}>
        chart
        <CoinInfo id={id}></CoinInfo>
      </div>          
    </div>
  )
}

