const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
)

//create model
const User = mongoose.model('User', userSchema)
module.exports = User