import { NextApiResponse, NextApiRequest } from "next";
import {
  getSessionCookie,
  getSessionExpirationDate,
} from "../../../lib/getSessionExpirationDate";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData = JSON.parse(req.body);

  const existingUser = await prisma.user.findFirst({
    where: { email: formData.email, password: formData.password },
  });

  if (!existingUser) {
    res.status(401);
    return res.send({
      error: "Nazwa użytkownika lub hasło są niepoprawne!",
    });
  }

  //create session
  const sessionExpirationDate = getSessionExpirationDate();
  const session = await prisma.session.create({
    data: {
      expiresAt: sessionExpirationDate,
      userId: existingUser.id,
    },
  });

  //set cookie
  res.setHeader(
    "Set-Cookie",
    getSessionCookie(session.id, sessionExpirationDate)
  );

  return res.status(200).send({ error: null });
}
