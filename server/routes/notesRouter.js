const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes");

router.get(
    "/:userid/:courseId/module/:moduleNumber",
    notesController.getNotesByModule
);
router.post(
    "/:userid/:courseId/module/:moduleNumber",
    notesController.createNote
);
router.delete("/:userid/note/:noteId", notesController.deleteNote);

module.exports = router;
