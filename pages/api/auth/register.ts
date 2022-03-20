import { NextApiResponse, NextApiRequest } from "next";
import { getSessionCookie, getSessionExpirationDate } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData = JSON.parse(req.body);
  console.log(formData);

  const existingUser = await prisma.user.findFirst({
    where: { email: formData.email },
  });

  if (existingUser) {
    res.status(401);
    return res.send({
      error: "Konto z tym adresem e-mail już istnieje, spróbuj się zalogować!",
    });
  }

  const newUser = await prisma.user.create({ data: formData });

  //create session
  const sessionExpirationDate = getSessionExpirationDate();

  const session = await prisma.session.create({
    data: {
      expiresAt: sessionExpirationDate,
      userId: newUser.id,
    },
  });

  //set cookie
  res.setHeader(
    "Set-Cookie",
    getSessionCookie(session.id, sessionExpirationDate)
  );

  return res.status(200).send({ error: null });
}
