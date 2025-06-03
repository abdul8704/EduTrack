const CourseDetails = require("../models/courseDetails");
const CourseContent = require("../models/courseContent");
const Progress = require("../models/courseProgress");
const User = require("../models/userDetails");

const getUserInfoByUserId = async (req, res) => {
    const { userid } = req.params;
    try {
        const user = await User.findOne(
            { userid: userid },
            {
                passwordHash: 0, // Exclude password hash from the response
            }
        );
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, username: user });
    } catch (error) {
        console.error("Error fetching username:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching username",
            errorMessage: error.message,
        });
    }
};

const getAllCourses = async (req, res) => {
    const { userid } = req.params;

    try {
        const user = await User.findOne({ userid: userid });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
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

        // Get all progress records for the user
        const progressRecords = await Progress.find({ userId: userid });

        const completedCourseIds = new Set();
        const ongoingCourseIds = new Set();

        // Categorize enrolled courses into completed and ongoing
        progressRecords.forEach((record) => {
            if (record.percentComplete === 100) {
                completedCourseIds.add(record.courseId);
            } else {
                ongoingCourseIds.add(record.courseId);
            }
        });

        const completedCourses = [];
        const enrolledCourses = [];
        const availableCourses = [];

        allCourses.forEach((course) => {
            if (completedCourseIds.has(course.courseId)) {
                completedCourses.push(course);
            } else if (ongoingCourseIds.has(course.courseId)) {
                enrolledCourses.push(course);
            } else {
                availableCourses.push(course);
            }
        });

        return res.status(200).json({
            success: true,
            enrolledCourses,
            availableCourses,
            completedCourses,
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            errorMessage: error.message,
        });
    }
};


const getCourseById = async (req, res) => {
    try {
        const { userid, courseId } = req.params;
        const course = await CourseDetails.findOne(
            { courseId },
            {
                courseName: 1,
                courseDescription: 1,
                courseRating: 1,
                courseInstructor: 1,
                courseIntroVideo: 1,
                courseImage: 1,
                courseId: 1,
            }
        );
        let progress = await Progress.findOne(
            { userId: userid, courseId: courseId },
            {
                percentComplete: 1,
            }
        )
        if( !progress)
            progress = { percentComplete: -1 };
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
            percentComplete: progress.percentComplete
                ? progress.percentComplete
                : 0,
            contents: formattedContents,
        });
    } catch (error) {
        console.error("Error fetching course bmy ID:", error);
        return res.status(500).json({
            success: false,
            message: "unable to get course details with id",
            errrorMessage: error.message,
        });
    }
};

const getSubModuleByCourseId = async (req, res) => {
    const { userid, courseId, moduleNumber, subModuleNumber } = req.params;
    try {
        const userExists = await User.findOne({userid: userid})
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

const getProgressMatrixByCourseId = async (req, res) => {
    const { userid, courseid } = req.params;
    try{
        const progressMatrix = await Progress.findOne({ userId: userid, courseId: courseid }, 
                {
                    moduleStatus: 1,
                }
        );
        res.status(200).json({
            success: true,
            progressMatrix: progressMatrix ? progressMatrix.moduleStatus : null,
        });
    }
    catch (error) {
        console.error("Error fetching progress matrix:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to get progress matrix",
            errorMessage: error.message,
        });
    }    
}

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
                _id:course._id,
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

const enrollUserInCourse = async (req, res) => {
    const { userid, courseid } = req.params;

    try {
        const user = await User.findOne({ userid });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.currentCourses.includes(courseid)) {
            return res.status(400).json({ success: false, message: "User already enrolled in this course" });
        }

        user.currentCourses.push(courseid);
        await user.save();

        const courseDetails = await CourseDetails.findOne({ courseId: courseid });
        const courseContent = await CourseContent.findOne({ courseId: courseid });
        if (!courseContent) {
            return res.status(404).json({ success: false, message: "Course not found hehe", cc: courseContent, dd: courseDetails });
        }

        const newProgress = new Progress({
            userId: userid,
            courseId: courseid,
            courseName: courseDetails.courseName,
            percentComplete: 0,
            moduleStatus: {
                totalSubModules: courseContent.modules.reduce(
                    (total, module) => total + module.submodules.length,
                    0
                ),
                completedModules: Array.from(
                    { length: courseContent.modules.length },
                    () =>
                        Array(courseContent.modules[0].submodules.length).fill(
                            false
                        )
                ),
            },
        });
        await newProgress.save();

        return res.status(200).json({ success: true, message: "User enrolled in course successfully" });
    } catch (error) {
        console.error("Error enrolling user in course:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while enrolling user in course",
            errorMessage: error.message,
        });
    }
}

const updateRating = async (req, res) => {
    const {userid, courseid} = req.params;
    const {rating} = req.body
    try{
        const courseData = await CourseDetails.findOne({courseId: courseid})
        const updatedCompletions = courseData.courseCompletions + 1;
        const updatedRating = (courseData.courseRating + rating) / updatedCompletions;
        
        await CourseDetails.updateOne({ courseId: courseid }, 
            {
                $set: {
                    courseCompletions: updatedCompletions, 
                    courseRating: updatedRating
                } 
            
        });       
        
        return res.status(200).json({ success: true, message: "rating updated successfully"})
    }catch(err){
        res.status(500).json({ success: false, message: "nope.", msg: err.message})
    }

}

module.exports = {
    getUserInfoByUserId,
    getAllCourses,
    getCourseById,
    getSubModuleByCourseId,
    updateProgress,
    searchCourse,
    enrollUserInCourse,
    getProgressMatrixByCourseId,
    updateRating
};