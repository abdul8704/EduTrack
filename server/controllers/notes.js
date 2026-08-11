const CourseNote = require("../models/courseNote");

const getNotesByModule = async (req, res) => {
    const { userid, courseId, moduleNumber } = req.params;

    try {
        const notes = await CourseNote.find({
            userId: userid,
            courseId: courseId,
            moduleNumber: parseInt(moduleNumber),
        }).sort({ createdAt: 1 });

        return res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch notes",
            errorMessage: error.message,
        });
    }
};

const createNote = async (req, res) => {
    const { userid, courseId, moduleNumber } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res
            .status(400)
            .json({ success: false, message: "Note text is required" });
    }

    const moduleIndex = parseInt(moduleNumber);

    if (Number.isNaN(moduleIndex) || moduleIndex < 0) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid module index" });
    }

    try {
        const note = await CourseNote.create({
            userId: userid,
            courseId: courseId,
            moduleNumber: moduleIndex,
            text: text.trim(),
        });

        return res.status(201).json({ success: true, note });
    } catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to create note",
            errorMessage: error.message,
        });
    }
};

const deleteNote = async (req, res) => {
    const { userid, noteId } = req.params;

    try {
        // Scoped by userId so one learner cannot delete another's note.
        const deleted = await CourseNote.findOneAndDelete({
            _id: noteId,
            userId: userid,
        });

        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Note not found" });
        }

        return res
            .status(200)
            .json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete note",
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getNotesByModule,
    createNote,
    deleteNote,
};
