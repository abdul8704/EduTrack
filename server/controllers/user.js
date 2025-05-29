const CourseDetails = require("../models/courseDetails");
const CourseContent = require("../models/courseContent");
const Progress = require("../models/courseProgress");
const User = require("../models/userDetails");

const getAllCourses = async (req, res) => {
    const { userid } = req.params;

    try {
        const user = await User.findOne({ userid: userid });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

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
        return res.status(500).json({
            success: false,
            message: "Server error",
            errrorMessage: error.message,
        });
    }
};

const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await CourseDetails.findOne(
            { courseId },
            {
                courseName: 1,
                courseDescription: 1,
                courseRating: 1,
                courseInstructor: 1,
                courseIntroVideo: 1,
            }
        );
        if (!course)
            return res.status(404).json({
                success: false,
                message: "Course not found(coursedetails collection)",
            });

        const contents = await CourseContent.findOne(
            { courseId: courseId },
            {
                "modules.moduleTitle": 1,
                _id: 0,
                "modules.submodules.submoduleTitle": 1,
            }
        );

        if (!contents)
            return res.status(404).json({
                success: false,
                message: "Course content not found(course contents table)",
            });

        const formattedContents = contents.modules.map((module) => ({
            moduleTitle: module.moduleTitle,
            submodules: module.submodules.map((sub) => sub.submoduleTitle),
        }));

        return res.status(200).json({
            success: true,
            data: course,
            contents: formattedContents,
        });
    } catch (error) {
        console.error("Error fetching course bmy ID:", error);
        return res.status(500).json({
            success: falsm,
            message: "unable to get course details with id",
            errrorMessage: error.message,
        });
    }
};

const getSubModuleByCourseId = async (req, res) => {
    const { userid, courseId, moduleNumber, subModuleNumber } = req.params;
    try {
        const userExists = await User.findOne({userid})
        if(!userExists)
                return res.status(404).json({success: false, message: "invalid user"});
        
        const course = await CourseContent.findOne({ courseId });
        if (!course)
            return res.status(404).json({
                success: false,
                message:
                    "this error should never oocur. if it does, u messed up big time.",
            });

        const moduleIndex = parseInt(moduleNumber);
        const subModuleIndex = parseInt(subModuleNumber);

        if (
            isNaN(moduleIndex) ||
            moduleIndex < 0 ||
            moduleIndex >= course.modules.length
        ) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid module index" });
        }

        if (
            isNaN(subModuleIndex) ||
            subModuleIndex < 0 ||
            subModuleIndex >= course.modules[moduleIndex].submodules.length
        ) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid submodule index" });
        }

        const subModuleContent =
            course.modules[moduleIndex].submodules[subModuleIndex];
        return res
            .status(200)
            .json({ success: true, subModule: subModuleContent });
    } catch (error) {
        console.error("Error fetching submodule by course ID:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to get submodule details",
            errorMessage: error.message,
        });
    }
};

const updateProgress = async (req, res) => {
    const { userid, courseId, moduleNumber, subModuleNumber } = req.params;
    try {
        const user = await User.findOne({ userid });
        if (!user) {
            return res.status(404).json({ success: false, message: "invalid user found" });
        }
        const course = await CourseContent.findOne({ courseId });
        if (!course || course.length === 0) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        const moduleIndex = parseInt(moduleNumber);
        const subModuleIndex = parseInt(subModuleNumber);
        if (
            isNaN(moduleIndex) ||
            moduleIndex < 0 ||
            moduleIndex >= course.modules.length
        ) {
            return res.status(400).json({ success: false, message: "Invalid module index" });
        }
        if (
            isNaN(subModuleIndex) ||
            subModuleIndex < 0 ||
            subModuleIndex >= course.modules[moduleIndex].submodules.length
        ) {
            return res.status(400).json({ success: false, message: "Invalid submodule index" });
        }
        const currentProgress = await Progress.findOne({
            userId: userid,
            courseId: courseId,
        });

        if (!currentProgress) {
            return res.status(404).json({ success: false, message: "This user has not enrolled in this course" });
        }

        currentProgress.moduleStatus.completedModules[moduleIndex][subModuleIndex] = true;

        let totalTrueCount = 0;
        
        for(let i = 0; i < currentProgress.moduleStatus.completedModules.length; i++) {
            totalTrueCount += currentProgress.moduleStatus.completedModules[i].filter(Boolean).length;
        }
        const updatedPercentComplete = Math.round(totalTrueCount / (currentProgress.moduleStatus.totalSubModules) * 100);
        currentProgress.percentComplete = updatedPercentComplete;
        await currentProgress.save();

        res.status(200).json({
            success: true,
            message: "Progress updated successfully",
            UpdatedPercentComplete: updatedPercentComplete,
        });

    }catch (error) {
        console.error("Error updating progress:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update progress",
            errorMessage: error.message,
        });
    }
} 

const searchCourse = async (req, res) => {
    let tags =
        req.query.tags?.split(",").map((t) => t.trim().toLowerCase()) || [];
    
    try {
        const courses = await CourseDetails.aggregate([
            {
                $addFields: {
                    matchingTags: {
                        $size: {
                            $setIntersection: ["$tags", tags]
                        }
                    }
                }
            },
            {
                $match: {
                    matchingTags: { $gt: 0 } // only courses with at least 1 matching tag
                }
            },
            {
                $sort: {
                    matchingTags: -1 // most matches first
                }
            }
        ]);

        if (courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found matching the provided tags",
            });
        }

        return res.status(200).json({
            success: true,
            courses: courses.map(course => ({
                courseId: course.courseId,
                courseName: course.courseName,
                courseRating: course.courseRating,
                courseInstructor: course.courseInstructor,
                courseImage: course.courseImage,
                tags: course.tags,
            })),
        });

    } catch (error) {
            console.error("Error searching courses:", error);
            return res.status(500).json({
                success: false,
                message: "Server error while searching courses",
                errorMessage: error.message,
            });
    }
}

module.exports = {
    getAllCourses,
    getCourseById,
    getSubModuleByCourseId,
    updateProgress,
    searchCourse,
};
