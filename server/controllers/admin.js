const User = require("../models/userDetails");
const Progress = require("../models/courseProgress");
const ContentsOfCourse = require("../models/courseContent"); // Assuming you have a model for course content
const Courses = require("../models/courseDetails"); // Assuming you have a model for course details

const isAdmin = async (adminid) => {
    const userData = await User.findOne({ userid: adminid });
    return userData && userData.role === "admin";
};

const getAllCourses = async (req, res) => {
    if (!isAdmin(req.params.adminid))
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });

    try {
        const allCourses = await Courses.find(
            {},
            {
                courseId: 1,
                courseName: 1,
                courseImage: 1,
                courseInstructor: 1,
                courseRating: 1,
            }
        );

        res.status(200).json({ success: true, allCourses: allCourses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    if (!isAdmin(req.params.adminid))
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });

    const userData = await User.find(
        {},
        {
            username: 1,
            userid: 1,
            email: 1,
            profilePicture: 1,
            role: 1,
            position: 1,
        }
    );
    res.status(200).json({ success: true, allUsers: userData });
};

const getUserById = async (req, res) => {
    if (!isAdmin(req.params.adminid))
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });
    const { userid } = req.params;
    try {
        const user = await User.findOne(
            { userid: userid },
            {
                username: 1,
                email: 1,
                profilePicture: 1,
                position: 1,
            }
        );
        console.log("HERE", user, userid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({ success: true, user: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const getProgressByUserId = async (req, res) => {
    if (!isAdmin(req.params.adminid))
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });
    const { employeeid } = req.params;
    try {
        const userProgress = await Progress.find(
            { userId: employeeid },
            {
                userId: 1,
                courseId: 1,
                courseName: 1,
                percentComplete: 1,
            }
        ).lean();

        if (!userProgress || userProgress.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No progress found for this user",
            });
        }

        const courseDetails = await Courses.find(
            { courseId: { $in: userProgress.map((p) => p.courseId) } },
            { courseName: 1, courseId: 1, courseImage: 1, courseInstructor: 1 }
        );

        for (let i = 0; i < userProgress.length; i++) {
            const course = courseDetails.find(
                (c) => c.courseId === userProgress[i].courseId
            );
            if (course) {
                userProgress[i].courseImage = course.courseImage;
                userProgress[i].courseInstructor = course.courseInstructor;
            }
        }

        res.status(200).json({ success: true, progress: userProgress });
    } catch (error) {
        console.error("Error fetching progress:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const addNewUser = async (req, res) => {
    try {
        const adminid = req.params.adminid;
        const targetUserid = req.params.userid;

        const admin = await User.findOne({ userid: adminid });
        if (!admin || admin.role !== "admin") {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Access denied. Admins only.",
                });
        }

        const user = await User.findOne({ userid: targetUserid });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        user.role = "admin";
        await user.save();

        return res.json({
            success: true,
            message: "User promoted to admin successfully",
        });
    } catch (error) {
        console.error("Error promoting user:", error);
        return res
            .status(500)
            .json({ success: false, message: "Server error" });
    }
};

const getUserForCourse = async (req, res) => {
    if (!isAdmin(req.params.adminid))
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });
    const { courseId } = req.params;
    try {
        const courseExists = await Courses.findOne({ courseId: courseId });
        if (!courseExists) {
            return res
                .status(404)
                .json({ success: false, message: "Course does not exist" });
        }

        const courseData = await Progress.find(
            { courseId },
            {
                userId: 1,
                courseName: 1,
                percentComplete: 1,
            }
        );

        const userNameId = await User.find(
            {},
            {
                username: 1,
                userid: 1,
                profilePicture: 1,
            }
        );

        const data = [];

        courseData.map((progress) => {
            const user = userNameId.find(
                (user) => user.userid === progress.userId
            );
            data.push({
                username: user ? user.username : "Unknown User",
                userId: progress.userId,
                completion: progress.percentComplete,
                profilePicture: user ? user.profilePicture : null,
            });
        });
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const updateUserRole = async (req, res) => {
    if (!isAdmin(req.params.adminid))
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });
    const { userid, newRole } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { userid: userid },
            { role: newRole }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            user: user,
        });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const addNewCourse = async (req, res) => {
    if (!isAdmin(req.params.adminid))
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });
    const {
        courseId,
        courseName,
        courseImage,
        instructorName,
        description,
        tags,
        modules,
        introVideoTitle,
        introVideo,
    } = req.body;

    try {
        const existingCourse = await Courses.findOne({ courseId: courseId });
        if (existingCourse) {
            return res.status(400).json({
                success: false,
                message: "Course already exists",
            });
        }

        const newCourse = new Courses({
            courseId: courseId,
            courseName: courseName,
            courseImage:
                courseImage || "https://example.com/default-course-image.jpg", // Placeholder image URL
            courseInstructor: instructorName,
            courseDescription: description,
            tags: tags || [],
            courseIntroVideo: {
                videoTitle: introVideoTitle,
                videoUrl: introVideo,
            },
        });
        await newCourse.save();

        const transformedModules = modules.map((module) => ({
            moduleTitle: module.name,
            submodules: module.lectures.map((lecture) => ({
                submoduleTitle: lecture.title,
                description: lecture.description,
                video: {
                    videoTitle: lecture.videoTitle,
                    videoUrl: lecture.videoLink,
                },
                quiz: {
                    questions: lecture.assignments.map((assignment) => ({
                        questionText: assignment.question,
                        options: assignment.choices,
                        correctAnswer: assignment.correctAnswer,
                    })),
                },
            })),
        }));

        const newCourseContent = new ContentsOfCourse({
            courseId,
            modules: transformedModules,
        });

        await newCourseContent.save();

        res.status(201).json({
            success: true,
            message: "Course created successfully",
        });
    } catch (error) {
        console.error("Unable to create new course", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const getCourseInfoById = async (req, res) => {
    if (!isAdmin(req.params.adminid)) {
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });
    }

    const { courseId } = req.params;

    try {
        // Fetch basic course info
        const course = await Courses.findOne(
            { courseId: courseId },
            {
                courseName: 1,
                courseImage: 1,
                courseInstructor: 1,
                courseRating: 1,
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Fetch module titles and submodule titles
        const courseContent = await ContentsOfCourse.findOne(
            { courseId: courseId },
            { modules: 1 }
        );

        let tableOfContents = [];

        if (courseContent && courseContent.modules.length > 0) {
            tableOfContents = courseContent.modules.map((module) => ({
                moduleTitle: module.moduleTitle,
                submodules: module.submodules.map((sub) => sub.submoduleTitle),
            }));
        }

        // Return course info and table of contents
        res.status(200).json({
            success: true,
            course: course,
            tableOfContents: tableOfContents,
        });
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    getAllCourses,
    addNewUser,
    getUserForCourse,
    getProgressByUserId,
    getUserById,
    updateUserRole,
    addNewCourse,
    getCourseInfoById,
};
