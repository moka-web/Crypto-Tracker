import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from "@mui/material"
import { ThemeProvider, createTheme, makeStyles} from '@mui/material'
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import CryptoCurrencyContext, {CryptoContext}  from "../cryptoContext"


export const Header = ()=>{

    const {currency,setCurrency} = useContext(CryptoCurrencyContext)
        
    

        const navigate = useNavigate()
        
        const darkTheme = createTheme({
            palette:{
                primary:{
                    main:"#fff"
                },
                type:"dark"
            }
        })




    return(
        <>
        <ThemeProvider theme={darkTheme}>

            <AppBar color="transparent" position="static">
                <Container >
                    <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
                        <Typography onClick={()=>navigate("/")} variant="i"gutterBottom sx={{color:"gold",fontFamily:"montserrat",fontWeight:"bold",cursor:"pointer"}}>
                            CryptoTracker
                        </Typography>
                        <Select value={currency} onChange={(e)=>{setCurrency(e.target.value)}} variant="outlined" sx={{width:100,height:40,mr:15, border:"0.2px solid #fff",color:"#fff" , backgroundColor:"black"}}>
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"ARS"}>ARS</MenuItem>
                             
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>

        </ThemeProvider>
        </>
    )
}