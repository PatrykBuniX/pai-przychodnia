import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Layout } from "../components/Layout/Layout";
import { InferPagePropsType } from "../lib/types";
import { prisma } from "../lib/prisma";
import Link from "next/link";

const Home = ({
  user,
  appointments,
  newAppointmentId,
}: InferPagePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Head>
        <title>Przychodnia</title>
      </Head>
      <div>
        <main className="flex flex-col items-center">
          <h2 className="mt-8 text-3xl font-semibold">Moje wizyty</h2>
          {appointments.length < 1 && (
            <p className="mt-5">Nie masz żadnych rezerwacji!</p>
          )}
          <ul className="mt-5 grid grid-cols-2">
            {appointments
              .sort((a) => (a.id === newAppointmentId ? -1 : 1))
              .map((a) => {
                return (
                  <li
                    className={`group relative p-3 rounded-md border-2 m-4 shadow-md hover:scale-110 transition-transform ${
                      a.id === newAppointmentId
                        ? "animate-slidein border-blue-600 scale-105 hover:rotate-2"
                        : ""
                    }`}
                    key={a.id}
                  >
                    <h3 className="group-hover:underline font-bold italic text-sm text-gray-400">
                      {a.id}
                    </h3>
                    <p className="mt-5 text-blue-600">
                      Lekarz:{" "}
                      <strong className="text-black">{a.doctor.name}</strong>
                    </p>
                    <p className="mt-2 text-blue-600">
                      Data: <strong className="text-black">{a.date}</strong>
                    </p>
                    <p className="text-blue-600">
                      Godzina: <strong className="text-black">{a.time}</strong>
                    </p>
                    {a.id === newAppointmentId && (
                      <p className="bg-blue-600 w-auto py-1 px-2 text-white rounded-md absolute bottom-2 right-2 animate-pulse">
                        Nowa rezerwacja
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
          <Link href="/">
            <a className="mt-5 underline hover:text-blue-600">
              Wróć do strony głównej
            </a>
          </Link>
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
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.userId },
    include: { doctor: true },
  });

  return {
    props: {
      user: session.user,
      appointments,
      newAppointmentId: ctx.query["new-app"] || null,
    },
  };
}
