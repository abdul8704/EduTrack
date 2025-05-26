import { useState } from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { Courses } from './components/Courses.jsx'
import { Login } from './components/Login.jsx'
import { Singup } from './components/Signup.jsx'

function AppContent() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/course' element={<Courses />} />
      </Routes>
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
