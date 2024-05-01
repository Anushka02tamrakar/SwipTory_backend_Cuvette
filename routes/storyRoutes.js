const express = require('express');
const router = express.Router();
const { isAuth } = require("../middlewares/auth")
const { createStory,
    getStories,
    getStoryById,
    updateStory
} = require('../controllers/story')

const { likeStory } = require("../controllers/likes")

//routes

router.post("/create", createStory)
router.get("/getAll", getStories)
router.get("/getById/:storyId", getStoryById)
router.put("/update/:id", updateStory)
router.put("/like/:id", likeStory);

module.exports = router;