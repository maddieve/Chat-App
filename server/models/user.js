const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:6,
        unique: true
        
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        max:50
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    disability: {
        type: String,
        min: 3
    },
    date: {
        type: Date,
        default: Date.now
    },
    isOnline: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    }

);

module.exports = mongoose.model('User', userSchema);