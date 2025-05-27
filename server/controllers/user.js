const CourseDetails = require('../models/courseDetails');
const CourseContent = require('../models/courseContent');
const User = require('../models/userDetails');
const courseContent = require('../models/courseContent');

const getAllCourses = async (req, res) => {
    const courses = await CourseDetails.find({});
    return res.status(200).json({ success:true, data: courses });
}

const getCourseById = async (req, res) => {
    const { courseId } = req.params;
    const course = await CourseDetails.findOne(
        { courseId },
        {
            courseName: 1,
            courseDescription: 1,
            courseRating: 1,
            courseInstructor: 1,
            courseIntroVideo: 1
        }
    ); 
    if (!course)
        return res.status(404).json({ success: false, message: 'Course not found' });
    
    return res.status(200).json({ success: true, data: course }); 
}


const getModuleByCourseId = async (req, res) => {
    const { courseId, moduleNumber } = req.params;
    const course = await CourseContent.findOne(
        { courseId },
    );
    if (!course) 
        return res.status(404).json({ success: false, message: 'Course content not found' });
    return res.status(200).json({ success: true, data: course });
}



module.exports = {
    getAllCourses,
    getCourseById,
    getModuleByCourseId 
};
