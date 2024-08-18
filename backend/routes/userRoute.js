import { Router } from "express";
import { prisma } from "../db/db.js";
export const userRouter = Router()

userRouter.post('/contact/add', async (req, res) => {
    const digitalNumber = Number.parseInt(req.body.digitalNumber)

    try{
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

userRouter.get('/bulk', async (req, res) => {
    try{
        const users = await prisma.user.findMany({});

        return res.status(200).json({
            users,
        });
    }
    catch(e){
        return res.status(500).json({
            msg: "Server Error"
        })
    }
    
});
