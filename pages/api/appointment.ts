import { Appointment } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

type Data = {
  error: string | null;
  data: Appointment | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).send({ error: "Only POST requests allowed", data: null });
    return;
  }

  const sessionId = req.cookies.authorization;

  if (!sessionId) {
    res
      .status(403)
      .send({ error: "Forbidden - user not logged in", data: null });
    return;
  }

  const session = await prisma.session.findUnique({ where: { id: sessionId } });

  if (!session) {
    res
      .status(403)
      .send({ error: "Forbidden - user not logged in", data: null });
    return;
  }

  const { pickedDoctorId, pickedDate, pickedTime } = JSON.parse(req.body);
  console.log({ pickedDoctorId, pickedDate, pickedTime });
  const newAppointment = await prisma.appointment.create({
    data: {
      userId: session.userId,
      doctorId: pickedDoctorId,
      date: pickedDate,
      time: pickedTime,
    },
  });
  console.log(newAppointment);

  res.status(200).json({ data: newAppointment, error: null });
  return;
}
