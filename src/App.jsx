import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForecastPage from './pages/ForecastPage.jsx'
import Home from './Home.jsx'

function App() {

    return (
      <BrowserRouter>
        <Routes>
          <Route path='/forecast/:city' element={<ForecastPage/>}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    )
 
}

export default App
