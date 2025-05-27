import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { CoursePage } from './components/CoursePage';
import { Course } from './components/Course';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/coursepage" element={<CoursePage />} />
        <Route path="/course" element={<Course />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
