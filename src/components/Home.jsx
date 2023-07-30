import { useEffect, useState } from "react";
import { Banner } from "./banner"
import axios from "axios";
import { CoinsTable } from "./coinsTable";


 export const Home = () => {


    //ESTO ESTA COMENTADO PARA NO GASTAR EL ENDPOINT


  // const [coins,setCoins] = useState([])

  //   const getApidata = async()=>{
  //     try {
  //       await axios('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD&CMC_PRO_API_KEY=7b65cf26-bdf2-460a-947b-d0130c27c2da')
  //       .then(res=>{
  //         setCoins(res.data.data)
  //         console.log("esto es coins",coins)
  //       })
      
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }



  //   useEffect(()=>{
  //     getApidata();
  //   },[])

    
    return (
    <>
    <Banner></Banner>
    <CoinsTable></CoinsTable>
    </>
  )

} 


 