"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The mail user is required']
    },
    password: {
        type: String,
        required: [true, 'The password user is required']
    }
});
userSchema.method('passwordValidation', function (password = '') {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.User = mongoose_1.model('User', userSchema);
