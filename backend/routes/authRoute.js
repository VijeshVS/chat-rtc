import { Router } from "express";
import generateDigitalNumber from "../utils/digitalNumber.js";
import { prisma } from '../db/db.js'
const auth = Router()

auth.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const duplicate = await prisma.user.findFirst({
        where:{
            name: username
        }
    })

    if (!duplicate) {
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

    return res.status(200).json({
        msg: 'User created successfully',
        digitalNumber,
    });

});

auth.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

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

    return res.status(200).json({
        msg: 'Login success',
    });
});

export default auth