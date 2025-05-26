import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Navbar } from './components/Navbar'

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
