import { Schema, model, Document } from 'mongoose';

const bcrypt = require('bcryptjs');
const userSchema = new Schema({
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

userSchema.method('passwordValidation', function(password: string = ''): boolean {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});

interface IUser extends Document {
    nombre: string;
    email: string;
    password: string;
    passwordValidation(password: string): boolean;
}

export const User = model<IUser>('User', userSchema);