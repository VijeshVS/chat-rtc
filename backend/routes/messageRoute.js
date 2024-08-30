import { Router } from "express";
import { prisma } from "../db/db.js";
import jwt from 'jsonwebtoken'
export const msgRouter = Router();

const JWT_PASS = process.env.JWT_PASS;

msgRouter.post("/conversation", async (req, res) => {
  const token = req.headers.token;
  const from = jwt.decode(token).username;
  const to = req.body.to;

  try{
    jwt.verify(token,JWT_PASS);
  }
  catch(e){
    return res.status(403).json({
      msg : "Unauthorized !!"
    })
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: from,
          },
          {
            name: to,
          },
        ],
      },
    });

    if (!users || users.length != 2) {
      return res.status(400).json({
        msg: "Invalid inputs",
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
           from:from,
           to:to
          },
          {
            from:to,
            to:from
          },
        ],
      },
    });

    return res.status(200).json({
      messages,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});
