const User = require('../models/userDetails');
const Progress = require('../models/courseProgress'); 
const Courses = require('../models/courseDetails'); // Assuming you have a model for course details

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ success: true, courseData: users });
}

const getAllUsersProgress = async (req, res) => {
    try {
        const progressData = await Progress.find();

        const grouped = {};

        progressData.forEach((entry) => {
            if (!grouped[entry.userId]) {
                grouped[entry.userId] = [];
            }
            grouped[entry.userId].push({
                courseName: entry.courseName,
                percentComplete: entry.percentComplete,
            });
        });
        if (!grouped)
            return res.status(404).json({ success: false, message: "No progress data found" });
        res.status(200).json(grouped);
    } catch (err) {
        console.error("Error fetching user progress:", err);
        res.status(500).json({ success: false, error: "Server error" });
    }
    
}

const addNewUser = async (req, res) => {
    try {
        const { username, emailHash, passwordHash } = req.body;
        const existingUser = await User.findOne({ email: emailHash });
        if (existingUser) 
            return res.status(400).json({ success: false, message: 'User already exists' });

        const newUser = new User({
            username: username,
            email: emailHash,
            userid: emailHash,
            passwordHash: passwordHash,
            currentCourses: [],
        });
        
        console.log("New user created:", newUser);
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Unable to create new user', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getUserForCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const courseExists = await Courses.findOne({ courseId: courseId });
        if (!courseExists) {
            return res.status(404).json({ success: false, message: 'Course does not exist' });
        }

        const courseData = await Progress.find({ courseId }, {
            userId: 1,
            courseName: 1,
            percentComplete: 1
        });
        
        const userNameId = await User.find({}, {
            username: 1,
            userid: 1,
        })
        
        const data = [];

        courseData.map((progress) => {

            const user = userNameId.find(user => user.userid === progress.userId);
            data.push({
                username: user ? user.username : "Unknown User",
                userId: progress.userId,
                completion: progress.percentComplete,
            });
        });
        res.status(200).json({ success: true, data: data});
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getAllUsers,
    getAllUsersProgress,
    addNewUser,
    getUserForCourse,
}; 