
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Layout/Header'
import MainPage from './components/pages/MainPage'

function App() {

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
