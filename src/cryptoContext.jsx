import { createContext } from "react";
import { useContext, useEffect, useState } from "react";

const CryptoCurrencyContext = createContext();

export const CryptoContext = ({ children }) => {

  const [currency, setCurrency] = useState("ARS");

        console.log("esta es la moneda :" , currency)
        
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "ARS") {
      setSymbol("$");
    } else if (currency === "USD") {
      setSymbol("u$$");
    }
  }, [currency]);

  return <CryptoCurrencyContext.Provider value={{ currency, symbol,setCurrency }}>{children}</CryptoCurrencyContext.Provider>
  
};


export default CryptoCurrencyContext
