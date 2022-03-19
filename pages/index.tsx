import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout/Layout";
import { InferPagePropsType } from "../lib/types";
import { prisma } from "../lib/prisma";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { getAppointments } from "../lib/getAppointments";
import { formatDate, getTommorowDate } from "../lib/date";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { getDeleteSessionCookie } from "../lib/getSessionExpirationDate";

const Home = ({
  user,
  doctors,
}: InferPagePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [pickedDoctorId, setPickedDoctorId] = useState(doctors[0].id);
  const [pickedDate, setPickedDate] = useState("");
  const [pickedTime, setPickedTime] = useState("");
  const [error, setError] = useState("");

  const handleDoctorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPickedDoctorId(e.currentTarget.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPickedDate(e.currentTarget.value);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPickedTime(e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      pickedDoctorId,
      pickedDate,
      pickedTime,
    };

    const appointmentEndpoint = `${
      getConfig().publicRuntimeConfig.BASE_URL
    }/api/appointment`;

    const res = await fetch(appointmentEndpoint, {
      body: JSON.stringify(formData),
      method: "POST",
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    setError("");
    router.push(`/wizyty?new-app=${data.data.id}`);
  };

  const pickedDoctor = useMemo(
    () => doctors.find((d) => d.id === pickedDoctorId)!,
    [doctors, pickedDoctorId]
  );

  const availableToday = useMemo(() => {
    return pickedDoctor.allAppointmentsTimes.filter(
      (a) =>
        !pickedDoctor.appointments.find(
          (t) => t.date === pickedDate && t.time === a
        )
    );
  }, [
    pickedDate,
    pickedDoctor.allAppointmentsTimes,
    pickedDoctor.appointments,
  ]);

  const minDate = useMemo(() => {
    const doctorsLastTime = availableToday[availableToday.length - 1];
    const dateStr = String(new Date()).replace(
      /(\d+:\d+:\d+)/,
      `${doctorsLastTime}:00`
    );

    const now = Date.now();
    const md =
      new Date(dateStr).getTime() > now
        ? formatDate(new Date(now))
        : formatDate(getTommorowDate());

    return md;
  }, [availableToday]);

  return (
    <Layout user={user}>
      <Head>
        <title>Przychodnia</title>
      </Head>
      <div>
        <main className="flex flex-col items-center">
          <h2 className="mt-8 text-3xl font-semibold">Zapisz się na wizytę!</h2>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >
            <h3 className="mt-8 text-lg font-medium">
              Krok 1: Wybierz lekarza
            </h3>
            <div className="w-full flex justify-center flex-wrap">
              {doctors.map((doctor) => {
                const isPicked = pickedDoctorId === doctor.id;
                return (
                  <div
                    style={{ minWidth: "15rem" }}
                    key={doctor.id}
                    className={`flex-1 max-w-xs m-5 rounded-md border-2 border-white-100 hover:opacity-80 shadow-md ${
                      isPicked ? "border-blue-600" : ""
                    }`}
                  >
                    <label
                      className="flex flex-col cursor-pointer p-2 "
                      htmlFor={doctor.name}
                    >
                      <div
                        style={{ minWidth: "11rem" }}
                        className="w-auto h-44 relative"
                      >
                        <Image
                          layout="fill"
                          className="rounded-md"
                          src={`/${doctor.avatar}`}
                          alt={`${doctor.name} photo.`}
                          objectFit="cover"
                        />
                      </div>
                      <h3 className="mt-2 text-lg font-semibold">
                        {doctor.name}
                      </h3>
                      <p className="text-sm">{doctor.description}</p>
                      <p className="text-md mt-4">
                        <span className="block">Godziny pracy:</span>
                        <code className="font-bold block">
                          7 dni w tygodniu
                        </code>
                        <code className="w-min font-bold">
                          {doctor.startTime} - {doctor.endTime}
                        </code>
                      </p>
                    </label>
                    <input
                      checked={isPicked}
                      className="hidden"
                      type="radio"
                      name="doctor"
                      value={doctor.id}
                      id={doctor.name}
                      onChange={handleDoctorChange}
                    />
                  </div>
                );
              })}
            </div>
            <h3 className="mt-8 text-lg font-medium">
              Krok 2: Wybierz datę i godzinę wizyty
            </h3>
            <div className="mt-2 flex items-center">
              <label htmlFor="date">Dzień: </label>
              <input
                className="ml-2 border-2 p-2 rounded-md"
                required
                type="date"
                onChange={handleDateChange}
                name="data"
                id="date"
                min={minDate}
                value={pickedDate}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="time">Godzina: </label>
              <select
                className="ml-2 border-2 p-1 rounded-md"
                onChange={handleTimeChange}
                value={pickedTime}
                required
                name="time"
                id="time"
              >
                <option value="">--Wybierz--</option>
                {availableToday
                  .map((a) => {
                    return (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    );
                  })
                  .filter((n) => !!n)}
              </select>
            </div>
            <button
              className="mt-7 block py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500"
              type="submit"
            >
              Zapisz się
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const sessionId = ctx.req.cookies.authorization;

  if (!sessionId) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) {
    ctx.res.setHeader("Set-Cookie", getDeleteSessionCookie());

    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const doctors = await prisma.doctor.findMany({
    include: { appointments: true },
  });

  const doctorsWithAppointments = doctors.map((d) => {
    const allAppointmentsTimes = getAppointments(d.startTime, d.endTime, 20);
    return { ...d, allAppointmentsTimes };
  });

  return { props: { user: session.user, doctors: doctorsWithAppointments } };
}
