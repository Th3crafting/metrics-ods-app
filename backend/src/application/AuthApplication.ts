import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_SECRET || "minimode32caracteresunapalabraquepuedesercualquiercosa";

export class AuthApplication {
    static generateToken(payload: object): string {
        return jwt.sign(payload, JWT_KEY, {expiresIn:"1d"});
    }

    static verifyToken(token: string): any {
        return jwt.verify(token, JWT_KEY);
    }
}