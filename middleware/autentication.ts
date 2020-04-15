import {Request, Response, NextFunction} from 'express';
import Token from '../classes/token';


export const verifyToken = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('x-token') || '';

    Token.verifyToken(userToken).then( (decode:any) => {
        console.log('Decode', decode);
        req.user = decode.user;
        next();
    }).catch(err => {

        res.json({
            ok: false,
            message: 'Invalid Token'
        });

    });

}