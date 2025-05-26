const mongoose = require('mongoose');

const courseDetailsSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  courseName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  instructor: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true,
    default: []
  }
});

module.exports = mongoose.model('CourseDetails', courseDetailsSchema);