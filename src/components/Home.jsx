import { useEffect, useState } from "react";
import { Banner } from "./banner"
import axios from "axios";
import { CoinsTable } from "./coinsTable";


 export const Home = () => {

    return (
    <>
    <Banner></Banner>
    <CoinsTable></CoinsTable>
    </>
  )

} 


 