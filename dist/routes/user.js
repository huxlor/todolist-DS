"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const token_1 = __importDefault(require("../classes/token"));
const autentication_1 = require("../middleware/autentication");
const userRoutes = express_1.Router();
const bcrypt = require('bcryptjs');
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    user_model_1.User.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                message: 'User or Password Incorrect'
            });
        }
        if (userDB.passwordValidation(body.password)) {
            const userToken = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email
            });
            res.json({
                ok: true,
                token: userToken
            });
        }
        else {
            return res.json({
                ok: false,
                message: 'User or Password Incorrect ***'
            });
        }
    });
});
// Crear Usuario
userRoutes.post('/create', (req, res) => {
    // Res Service
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    };
    user_model_1.User.create(user).then(userDB => {
        const userToken = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email
        });
        res.json({
            ok: true,
            token: userToken
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
// Actualizar Usuario
userRoutes.post('/update', autentication_1.verifyToken, (req, res) => {
    const user = {
        nombre: req.body.nombre || req.user.nombre,
        email: req.body.email || req.user.email
    };
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                message: 'User doesnt exits in the base data'
            });
        }
        const userToken = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email
        });
        res.json({
            ok: true,
            token: userToken
        });
    });
});
exports.default = userRoutes;
