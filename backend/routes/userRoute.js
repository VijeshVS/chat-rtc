import { Router } from "express";
import { prisma } from "../db/db.js";
export const userRouter = Router()
import jwt from 'jsonwebtoken'

userRouter.post('/contact/add', async (req, res) => {
    const digitalNumber = Number.parseInt(req.body.digitalNumber)
    const JWT_PASS = process.env.JWT_PASS;
    const token = req.headers.token;
    
    const decoded = jwt.decode(token);

    try{
        jwt.verify(token,JWT_PASS)
    }
    catch(e){
        return res.status(403).json({
            msg: "Unauthorized"
        })
    }

    try{
        if(decoded.digitalNumber == digitalNumber)
            throw new Error("Self Contact Addition")
        const user = await prisma.user.findFirst({
            where:{
                digitalNumber : digitalNumber
            }
        });
    
        if (!user) {
            return res.status(404).json({
                msg: 'User not found',
            });
        }
    
        return res.status(200).json({
            username: user.name,
            digitalNumber,
        });
    }
    catch(e) {
        return res.status(500).json({
            msg: "Server Error"
        });
    }
});
