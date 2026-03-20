
import './App.css'
import { Routes,Route } from "react-router"
import MainLayout from '../src/layout/MainLayout'
import SearchPage from './pages/Search'
import Home from './pages/HomePage/Home'
function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<MainLayout/>}>
          <Route index element={<Home />} />  
          <Route path = "/search" element= {<SearchPage />}></Route>
        </Route>
      
      </Routes>
    </>
  )
}

export default App
