const CourseDetails = require('../models/courseDetails');
const CourseContent = require('../models/courseContent');
const User = require("../models/userDetails");

const getAllCourses = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch user from UserDetails collection
        const user = await User.findOne({ userid: userId });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        // Fetch all courses
        const allCourses = await CourseDetails.find(
            {},
            {
                courseName: 1,
                courseRating: 1,
                courseInstructor: 1,
                courseImage: 1,
                courseId: 1,
            }
        );

        const currentCourseIds = user.currentCourses;

        // Separate enrolled and available courses
        const enrolledCourses = allCourses.filter((course) =>
            currentCourseIds.includes(course.courseId)
        );
        const availableCourses = allCourses.filter(
            (course) => !currentCourseIds.includes(course.courseId)
        );

        return res.status(200).json({
            success: true,
            enrolledCourses,
            availableCourses,
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res
            .status(500)
            .json({ success: false, message: "Server error" });
    }
};


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
