import { Router } from "express";
import generateDigitalNumber from "../utils/digitalNumber.js";
import { prisma } from '../db/db.js'
import jwt from 'jsonwebtoken'

const auth = Router()

auth.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        const duplicate = await prisma.user.findFirst({
            where:{
                name: username
            }
        })
    
        if (duplicate) {
            return res.status(400).json({
                msg: 'User already exists',
            });
        }
    
        const digitalNumber = generateDigitalNumber();
    
        await prisma.user.create({
            data:{
                name: username,
                digitalNumber,
                password
            }
        })

        const token = jwt.decode(digitalNumber)
    
        return res.status(200).json({
            msg: 'User created successfully',
            digitalNumber,
            token
        });
    }catch(e){
        return res.status(500).json({
            msg: "Server error"
        })
    }
    

});

auth.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        const user = await prisma.user.findFirst({
            where:{
                name : username,
                password
            }
        })
    
        if(!user){
            return res.status(404).json({
                msg: "User not found"
            })
        }
        const token = jwt.decode(digitalNumber)

        return res.status(200).json({
            msg: 'Login success',
            token
        });
    }
    catch(e){
        return res.status(500).json({
            msg: "Server Error"
        })
    }
});

export default auth