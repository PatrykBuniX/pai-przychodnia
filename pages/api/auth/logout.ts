import { NextApiResponse, NextApiRequest } from "next";
import { getDeleteSessionCookie } from "../../../lib/getSessionExpirationDate";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //delete cookie
    res.setHeader("Set-Cookie", getDeleteSessionCookie());

    //delete session
    await prisma.session.delete({
      where: { id: req.cookies.authorization },
    });
  } catch {}

  res.send(true);
}
