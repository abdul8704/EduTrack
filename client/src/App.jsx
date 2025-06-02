import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { UserDashboard } from './pages/UserDashboard';
import { CourseIntro } from './pages/CourseIntro';
import { CourseLearn } from './pages/CourseLearn';
import { EmpProgress } from './pages/EmpProgress';
import { AdminDashboard } from './pages/AdminDashboard';
import  { AddCourse }  from './pages/AddCourse'; 
import { CourseDeets } from './pages/CourseDeets';
import { AvailableCourses } from "./components/AvailableCourses";
import { Profile } from "./pages/Profile";
import { SearchResult } from "./components/SearchResult";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/dashboard/:userId" element={<UserDashboard />} />
        <Route path="/user/profile/:userId" element={<Profile/>}/>
        <Route path="/course/intro/:userId/:courseId" element={<CourseIntro />} />
        <Route path="/course/learn/:userId/:courseId/:moduleNumber/:subModuleNumber" element={<CourseLearn />} />
        <Route path="/course/search/:userId/tags/:tags" element={<SearchResult/>} />
        <Route path="/admin/dashboard/:userId/:navId/details" element={<AdminDashboard/>}/>
        <Route path="/admin/dashboard/:userId/details/emp/:empId" element={<EmpProgress/>}/>
        <Route path="/admin/dashboard/:userId/details/course/:courseId" element={<CourseDeets/>}/>
        <Route path="/admin/dashboard/:userId/course/addcourse" element={<AddCourse />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
