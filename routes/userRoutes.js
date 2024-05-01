const express = require('express');
const router = express.Router();

const { register,
    login,
    logout,
    loadUser
} = require('../controllers/user')

const { bookmarkStory,
    getAllBookmarks
} = require("../controllers/bookmark")

const {isAuth} = require('../middlewares/auth')

// auth routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/load/:username', loadUser)

//bookmark routes
router.post("/bookmark/:id", bookmarkStory)
router.get("/bookmarks/:userId", getAllBookmarks);

module.exports = router;