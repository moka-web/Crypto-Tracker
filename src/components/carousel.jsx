import React, { useContext, useEffect, useState } from "react";
import { TrendingCoins } from "../api/apiGecko";
import CryptoCurrencyContext from "../cryptoContext";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from "react-router-dom";
import { Box } from "@mui/material";


export function priceWithCommas(number) {

  if(number === undefined){
    return ''
  }
  return number.toString().replace(/(-?\d+)(\d{3})/, '$1,$2');
}

export const Carousel = () => {

  const { currency,symbol } = useContext(CryptoCurrencyContext);
  const [coins, setCoins] = useState([]);

  

  const fetchCoinsMarket = () => {
    axios
      .get(TrendingCoins(currency))
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error.message));
  };


  let items = coins.map((coin)=>{
    
        let profit = coin.price_change_percentage_24h <= 0

    return(
        <Link style={{display:"flex",flexDirection:"column"}} key={coin.id} to={`/coins/${coin.id}`}>
            <img style={{margin:"0 auto"}} height={"50"} width={"50"} src={coin?.image} alt={coin.name} />
            <span style={{margin:"0 auto",backdropFilter:"blur(10px)"}}>{coin.symbol}
                &nbsp;
                <span style={{color:"yellowgreen"}}>{profit } {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
            </span>
            <span style={{margin:"0 auto"}} >{symbol}{priceWithCommas(coin.current_price.toFixed(2))}</span>
        </Link>
    )
  })

  const responsive = {
    0: {
        items: 1,
    },
    512: {
        items: 4,
        
    }
  }

  useEffect(() => {
    // fetchingTrendingCoins();
    fetchCoinsMarket()
    console.log("ahora asi deberia quedar el estado ",coins);
  }, [currency]);

  return (
    

      <Box sx={{mt:5 ,width:"100%",p:0}} >
        <AliceCarousel autoPlayInterval={1000} infinite animationDuration={1500} disableDotsControls disableButtonsControls mouseTracking autoPlay  responsive={responsive}   items={items} >

        </AliceCarousel>
      </Box>

   
  );
};


