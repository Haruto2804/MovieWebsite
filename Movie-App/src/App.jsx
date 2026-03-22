
import './App.css'
import { Routes, Route } from "react-router"
import MainLayout from '../src/layout/MainLayout'
import SearchPage from './pages/Search'
import Home from './pages/HomePage/Home'
import DetailMovie from './/pages/DetailMoviePage/DetailMovie'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<DetailMovie />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
