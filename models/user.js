const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story',
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story',
        },
    ],
});
userSchema.index({username: 1});
userSchema.index({"bookmarks._id": 1});
userSchema.index({"likes._id": 1});

const User =  mongoose.model("UserStory", userSchema);
module.exports = User;