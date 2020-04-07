"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
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
            res.json({
                ok: true,
                token: 'asdfghjklñpoiuytrewq'
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
        res.json({
            ok: true,
            user: userDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = userRoutes;
