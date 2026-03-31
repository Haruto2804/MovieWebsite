
import './App.css'
import { Routes, Route } from "react-router"
import MainLayout from '../src/layout/MainLayout'
import Home from './pages/HomePage/Home'
import DetailMovie from './pages/DetailMoviePage/DetailMovie'
import SearchAndDiscover from './pages/SearchAndDiscoverPage/SearchAndDiscover'
import { MovieProvider } from './contexts/movieContext'
import ApprovePage from './pages/ApprovePage'
import { AuthContext, AuthProvider } from './contexts/authContext'
function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/movie/:id" element={<DetailMovie />}></Route>
            <Route path="/search_discover" element={<SearchAndDiscover />}></Route>
            <Route path="/approve" element={<ApprovePage />}></Route>
          </Route>
        </Routes>
      </MovieProvider>
    </AuthProvider>

  )
}

export default App
