const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
    {
        slides: [
            {
                heading: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                imageUrl: {
                    type: String,
                    required: true,
                },
                category: {
                    type: String,
                    required: true,
                },
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                username: String,
            },
        ],
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                username: String,
            },
        ],

        totalLikes: {
            type: Number,
            default: 0,
        },

        addedBy: {
            type: String,
        },
    },
    { timestamps: true }
);

storySchema.index({ addedBy: 1 }); // Index for the addedBy field
storySchema.index({ "likes._id": 1 }); // Index for the likes array
storySchema.index({ "bookmarks._id": 1 }); // Index for the bookmarks array

const Story = mongoose.model("Story", storySchema);
module.exports = Story;