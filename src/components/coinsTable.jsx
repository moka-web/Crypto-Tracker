import React from 'react'
import axios from "axios"
import { CoinList } from "../api/apiGecko"
import { useContext, useEffect, useState } from "react"
import CryptoCurrencyContext from "../cryptoContext"
import { ThemeProvider } from '@emotion/react'
import { Container, Typography, createTheme, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, Pagination,makeStyles, CircularProgress, Box} from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { priceWithCommas } from './carousel'
import { deepPurple, lime, purple,grey } from '@mui/material/colors'

 export const CoinsTable = () => {

    const navigate = useNavigate();

    const {currency ,symbol} = useContext(CryptoCurrencyContext)
    
    const [loading , setLoading]=useState(false);
    const [search , setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [coinlist,setCoinlist] = useState([]);

   const getListOfCoins = async ()=>{


    await axios.get(CoinList(currency))

    .then(res=>setCoinlist(res.data))
    .catch(error=>console.log(error.message));

   }

   useEffect(()=>{
    getListOfCoins()
   },[currency])

    console.log( "listado crrypto",coinlist)

    const theme = createTheme({
        palette: {
          primary: lime,
          secondary:grey,
        },
      });

      

    const handleSearch= () =>{
        return coinlist.filter((coin)=>(
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))

    }

        console.log(coinlist.length)    
    
  return (
    <>
        <ThemeProvider theme={theme}>
            <Box sx={{textAlign:"center", padding:"5%" }} xs={12} >
                <Typography variant='h4' sx={{fontFamily:"Montserrat" , m:"2%" , fontWeight:"bold" }}> Crypto currency prices by market cap</Typography>
                <TextField  focused  onChange={(e)=>setSearch(e.target.value)} sx={{  mt:5, mb:5, width:"100%" , height:40 }}  color='primary'  label="search"  variant='outlined' ></TextField>
                
                <TableContainer  sx={{width:"100%"}}>
                    {coinlist.length == 0 ? (  <>
                        
                        <h5>Loading...</h5>
                        <LinearProgress sx={{color:'gold'}} ></LinearProgress>
                        
                        </>) : 
                      
                    (<>
                    
                    <Table xs={6}>
                        <TableHead sx={{backgroundColor:"gold"}}>
                            <TableRow >
                              {["Coin" ,"Price","24h Change","Market Cap"].map((head)=>(

                                <TableCell  sx={{color:"black",fontWeight:"700",fontFamily:"Montserrat" , }} key={head} align={head == "Coin"? "" : "right"}>{head}</TableCell>

                              ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {handleSearch().slice((page - 1) * 10 , (page -1) * 10 + 10).map((row)=>{
                            const profit = row.price_change_percentage_24h > 0;
                            return(
                                <>
                                <TableRow sx={{}} key={row.name} onClick={()=>{navigate(`/coins/${row.id}`)}}>
                                    <TableCell component="th" scope='row' sx={{display:"flex", gap:1 }}>
                                        
                                        <div style={{display:"flex" , flexDirection:"column" }}>
                                        <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}} />
                                        <span style={{
                                            textTransform:"uppercase",
                                            fontSize:20,
                                            color: "white"
                                        }}>
                                            {row.symbol}

                                        </span>
                                        <span style={{color:"darkgrey"}}>
                                            {row.name}
                                        </span>
                                        </div>

                                    </TableCell>
                                    <TableCell align='right' sx={{color:'white'}} > {symbol}{" "}{priceWithCommas(row.current_price.toFixed(1))} </TableCell>
                                    <TableCell align='right' sx={{color:profit > 0 ? "rgb(14,203,129)" : "red" , fontWeight:"500"}}>{profit && "+"}{row.price_change_percentage_24h.toFixed(1)}%</TableCell>
                                    <TableCell align='right' sx={{color:"white"}}>{symbol}{row.market_cap.toString().slice(0,-6)}</TableCell>
                                </TableRow>
                                </>
                            )
                        
                        })}
                        </TableBody>
                    </Table>
                    
                    </>) }
                    

                </TableContainer>
                        <Pagination  onChange={(_,value)=>{
                            setPage(value)
                            window.scroll(0,450)
                        }} color='primary'  sx={{width:"100%" , display:"flex" , justifyContent:"center", mt:2 }}  count={(handleSearch()?.length/10).toFixed(0)}></Pagination>
            </Box>
        </ThemeProvider>
    </>

  )


}

