import { Router } from "express";
import { prisma } from "../db/db.js";

export const msgRouter = Router();

msgRouter.get("/bulk", async (req, res) => {
  try {
    const messages = await prisma.message.findMany({});
    return res.status(200).json(messages);
  } catch (e) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
});

msgRouter.get("/coversation", async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;

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

    const messages = prisma.message.findMany({
      where: {
        from: from,
        to: to,
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
