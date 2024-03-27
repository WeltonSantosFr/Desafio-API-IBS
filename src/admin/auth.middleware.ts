import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1]

        if(!token) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        jwt.verify(token, process.env.SECRET_KEY as string, (err, _) => {
            if(err) {
                throw new UnauthorizedException('Credenciais inválidas');
            }
        })

        next()
    }
}