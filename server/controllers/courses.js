const CourseDetails = require('../models/course_details');

const getAllCourses = async (req, res) => {
    const courses = await CourseDetails.find({});
    res.status(200).json({ courses });
}

module.exports = {
    getAllCourses
};
