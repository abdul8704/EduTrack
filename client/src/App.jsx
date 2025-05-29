import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { CoursePage } from './components/CoursePage';
import { Course } from './components/Course';
import { EmpProgress } from './components/EmpProgress';
import { AdminNavbar } from './components/AdminNavbar';
import {AddCourse} from './components/AddCourse'; 
import { CourseDeets } from './components/CourseDeets';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/coursepage/:userId/:courseId" element={<CoursePage />} />
        <Route path="/course/:useremail/:courseId/:moduleNumber/:subModuleNumber" element={<Course />} />
        <Route path="/" element={<Home />} />
        <Route path="/empprogress/:userId" element={<EmpProgress/>}/>
        <Route path="/adminnav" element={<AdminNavbar/>}/>
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/coursedeets" element={<CourseDeets />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
