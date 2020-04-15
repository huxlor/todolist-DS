import { Router, Request, Response } from "express";
import { User } from '../models/user.model';
import Token from '../classes/token';
import { verifyToken } from '../middleware/autentication';
import bodyParser from 'body-parser';


const userRoutes = Router();
const bcrypt = require('bcryptjs');


userRoutes.post('/login', (req: Request, res: Response) => {

    const body = req.body;

    User.findOne({email: body.email}, (err, userDB) => {
        if(err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                message: 'User or Password Incorrect'
            });
        }

        if (userDB.passwordValidation( body.password )) {

            const userToken = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email
            });

            res.json({
                ok: true,
                token: userToken
            });

        } else {
            return res.json({
                ok: false,
                message: 'User or Password Incorrect ***'
            });
        }
    });
});


// Crear Usuario
userRoutes.post('/create', (req: Request, res: Response) => {
    // Res Service

    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    };

    User.create(user).then( userDB => {

        const userToken = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email
        });

        res.json({
            ok: true,
            token: userToken
        });

    }).catch( err => {
        res.json({
            ok: false,
            err
        })
    });

});

// Actualizar Usuario
userRoutes.post('/update', verifyToken ,(req: any, res: Response) => {

    const user = {
        nombre: req.body.nombre || req.user.nombre,
        email: req.body.email || req.user.email
    }

    User.findByIdAndUpdate(req.user._id, user, {new: true}, (err, userDB) => {

        if(err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                message: 'User doesnt exits in the base data'
            });
        }

        const userToken = Token.getJwtToken({
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

export default userRoutes;

