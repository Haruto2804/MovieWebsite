
import './App.css'
import { Routes, Route } from "react-router"
import MainLayout from '../src/layout/MainLayout'
import Home from './pages/HomePage/Home'
import DetailMovie from './/pages/DetailMoviePage/DetailMovie'
import SearchAndDiscover from './pages/SearchAndDiscoverPage/SearchAndDiscover'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<DetailMovie />}></Route>
          <Route path="/search_discover" element={<SearchAndDiscover />}></Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
