import { Router, Request, Response } from "express";
import { User } from '../models/user.model';


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
            res.json({
                ok: true,
                token: 'asdfghjklñpoiuytrewq'
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
        res.json({
            ok: true,
            user: userDB
        });
    }).catch( err => {
        res.json({
            ok: false,
            err
        })
    });

});

export default userRoutes;

