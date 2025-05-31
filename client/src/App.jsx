import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { UserDashboard } from './pages/UserDashboard';
import { CoursePage } from './pages/CoursePage';
import { Course } from './pages/Course';
import { EmpProgress } from './pages/EmpProgress';
import { AdminNavbar } from './pages/AdminNavbar';
import {AddCourse} from './pages/AddCourse'; 
import { CourseDeets } from './pages/CourseDeets';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/coursepage/:userId/:courseId" element={<CoursePage />} /> */}
        {/* <Route path="/course/:useremail/:courseId/:moduleNumber/:subModuleNumber" element={<Course />} /> */}
        <Route path="/user/dashboard/:userId" element={<UserDashboard />} />
        {/* <Route path="/empprogress/:userId" element={<EmpProgress/>}/> */}
        {/* <Route path="/adminnav/:userId" element={<AdminNavbar/>}/> */}
        {/* <Route path="/addcourse" element={<AddCourse />} /> */}
        {/* <Route path="/coursedeets/:courseId" element={<CourseDeets />} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
