const CourseDetails = require('../models/courseDetails');
const CourseContent = require('../models/courseContent');
const User = require('../models/userDetails');

// TODO: write a funtion to fetch count of modules in a user, nu of submodules in  module.

const getAllCourses = async (req, res) => {
    try{
        const courses = await CourseDetails.find({}, {
            courseName: 1,
            courseRating: 1,
            courseInstructor: 1,
            courseImage: 1,
            courseId: 1
        });
        return res.status(200).json({ success:true, enrolledCourses: courses, availableCourses: courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
    
}

// TODO: Implement getCurrentCourses to fetch courses for a user
const getCurrentCourses = async (req, res) => {
    const { userId } = req.params;
}

const getCourseById = async (req, res) => {
    try{
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
            return res.status(404).json({ success: false, message: 'Course not found(coursedetails collection)' });
        
        const contents = await CourseContent.findOne(
            { courseId: courseId },
            {
                "modules.moduleTitle": 1,
                _id: 0,
                "modules.submodules.submoduleTitle": 1,
            }
        );
        
        if (!contents)
            return res.status(404).json({ success: false, message: 'Course content not found(course contents table)' });

        const formattedContents = contents.modules.map((module) => ({
            moduleTitle: module.moduleTitle,
            submodules: module.submodules.map((sub) => sub.submoduleTitle),
        }));

        return res.status(200).json({
            success: true,
            data: course,
            contents: formattedContents,
        });
        
        // return res.status(200).json({ success: true, data: course, contents: contents.modules  }); 
    }catch(error){
        console.error('Error fetching course bmy ID:', error);
        return res.status(500).json({ success: falsm, message: 'unable to get course details with id' });
    }
}


const getModuleByCourseId = async (req, res) => {
    const { courseId, moduleNumber } = req.params;
    const course = await CourseContent.findOne({ courseId });
    if (!course)
        return res
            .status(404)
            .json({ success: false, message: "Course content not found" });
    const moduleIndex = parseInt(moduleNumber);

    if (
        isNaN(moduleIndex) ||
        moduleIndex < 0 ||
        moduleIndex >= course.modules.length
    ) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid module index" });
    }

    const moduleContent = course.modules[moduleIndex].length;

    return res.status(200).json({ success: true, module: moduleContent });
}

const getSubModuleByCourseId = async (req, res) => {
    const { courseId, moduleNumber, subModuleNumber } = req.params;
}


module.exports = {
    getAllCourses,
    getCourseById,
    getModuleByCourseId,
};
