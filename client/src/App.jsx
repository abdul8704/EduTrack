import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App
