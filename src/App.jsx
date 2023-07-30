import { BrowserRouter,Route, Routes} from 'react-router-dom'
import './App.css'
import { Header } from './components/header'
import { Home } from './components/Home'
import { CoinPage } from './components/coinPage'
import { ThemeProvider, createTheme, makeStyles} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';



function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


  return (
    <BrowserRouter>

      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Header/>
        
        <Routes>

          <Route path='/' Component={Home}></Route>
          <Route path='/coins/:id' Component={CoinPage}></Route>
        
        </Routes>
        
      </ThemeProvider>    
        

    
        
    </BrowserRouter>  
  )
}

export default App
