const User = require("../models/userDetails");
const Progress = require("../models/courseProgress");
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
    
    try{
        const allCourses = await Courses.find({}, {
            courseId: 1,
            courseName: 1,
            courseImage: 1,
            courseInstructor: 1,
            courseRating: 1,
        });

        res.status(200).json({ success: true, allCourses: allCourses });
    }catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

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
    if (!isAdmin(req.params.adminid))
        return res
            .status(403)
            .json({ success: false, message: "Access denied. Admins only." });
    try {
        const { username, emailHash, passwordHash } = req.body;
        const existingUser = await User.findOne({ email: emailHash });
        if (existingUser)
            return res
                .status(400)
                .json({ success: false, message: "User already exists" });

        const newUser = new User({
            username: username,
            email: emailHash,
            userid: emailHash,
            passwordHash: passwordHash,
            currentCourses: [],
        });

        console.log("New user created:", newUser);
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.error("Unable to create new user", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
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
                profilePicture: user ? user.profilePicture : null
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
            { role: newRole },
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

module.exports = {
    getAllUsers,
    getAllCourses,
    addNewUser,
    getUserForCourse,
    getProgressByUserId,
    getUserById,
    updateUserRole,
};
