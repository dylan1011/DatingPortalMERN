import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import SignUp from './components/signup'
import { BrowserRouter,Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/signup" element = {<SignUp/>} />

      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
