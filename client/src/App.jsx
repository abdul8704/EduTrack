import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { CoursePage } from './components/CoursePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
