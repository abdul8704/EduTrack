import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { CoursePage } from './components/CoursePage';
import { Course } from './components/Course';
import { EmployeeDeets } from './components/EmployeeDeets';
import { EmpProgress } from './components/EmpProgress';
import { AdminNavbar } from './components/AdminNavbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/coursepage/:courseId" element={<CoursePage />} />
        <Route path="/course" element={<Course />} />
        <Route path="/" element={<Home />} />
        <Route path="/empdeets" element={<EmployeeDeets/>}/>
        <Route path="/empprogress" element={<EmpProgress/>}/>
        <Route path="/adminnav" element={<AdminNavbar/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
