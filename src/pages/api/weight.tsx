// api/weight.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  console.log("SESSION: ", session);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const userEmail = session.user.email;

  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userId = user.id;

  if (req.method === "GET") {
    const weights = await prisma.weightRecord.findMany({
      where: { userId },
      orderBy: { date: "asc" },
    });

    res.json(weights);
  } else if (req.method === "POST") {
    const { date, weight } = req.body;

    if (!weight) {
      return res.status(400).json({ error: "Weight is required." });
    }

    const newWeight = await prisma.weightRecord.create({
      data: { userId, weight, date },
    });

    res.json(newWeight);
  } else {
    res.status(405).end();
  }
}
