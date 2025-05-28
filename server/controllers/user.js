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
        });
        return res.status(200).json({ success:true, data: courses });
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
            { courseId: "CS101" },
            { "modules.moduleTitle": 1, _id: 0 }
        );
        
        if (!contents)
            return res.status(404).json({ success: false, message: 'Course content not found(course contents table)' });
        
        return res.status(200).json({ success: true, data: course, contents: contents.modules  }); 
    }catch(error){
        console.error('Error fetching course by ID:', error);
        return res.status(500).json({ success: false, message: 'unable to get course details with id' });
    }
}

const getModuleAndSubmoduleCount = async  (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await CourseContent.findOne({ courseId });

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const moduleCount = course.modules.length;
        const submoduleCounts = course.modules.map((mod, index) => ({
            moduleTitle: mod.moduleTitle,
            submoduleCount: mod.submodules.length,
        }));

        return res.status(200).json({
            success: true,
            moduleCount,
            submoduleCounts,
        });
    } catch (error) {
        return res.status(500).json({   
            success: false,
            message: "Error fetching course content",
            error: error.message,
        });
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
    getModuleAndSubmoduleCount,
};
