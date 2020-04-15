import jwt from 'jsonwebtoken';

export default class Token {
    private static seed: string = 'daniela-sebastian';
    private static timeOut: string = '30d';

    constructor() {}

    static getJwtToken(payload: any): string {
        return jwt.sign({user: payload }, this.seed, {expiresIn: this.timeOut} );
    }

    static verifyToken(userToken: string) {

        return new Promise((resolve, reject) => {

            jwt.verify(userToken, this.seed, (err, decoded) => {
                if(err) {
                    // Invalid Token 
                    reject();
                } else {
                    // Valid Token
                    resolve(decoded);
                }
            });

        });
    }   

}