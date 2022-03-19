import { FormEvent, useState, ChangeEvent } from "react";
import Head from "next/head";
import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout/Layout";
import { GetServerSidePropsContext } from "next";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, repeatPassword } = formData;
    if (password !== repeatPassword) {
      setError("Hasła są sobie różne!");
      return;
    }
    setError("");
    const registerEndpoint = `${
      getConfig().publicRuntimeConfig.BASE_URL
    }/api/auth/register`;

    const res = await fetch(registerEndpoint, {
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      method: "POST",
    });

    console.log(res);

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    router.push("/");
  };

  return (
    <Layout>
      <Head>
        <title>Przychodnia</title>
      </Head>
      <main className="p-5 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-600 mt-5">Rejestracja</h2>
        <form
          className="mt-5 shadow-md rounded-md p-7 w-80"
          onSubmit={handleSubmit}
        >
          <div className="mt-3 flex flex-col">
            <label className="text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 rounded-md p-1 mt-1 shadow-sm"
              required
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="mt-3 flex flex-col">
            <label className="text-sm font-semibold" htmlFor="password">
              Hasło
            </label>
            <input
              className="border-2 rounded-md p-1 mt-1 shadow-sm"
              required
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="mt-3 flex flex-col">
            <label className="text-sm font-semibold" htmlFor="password">
              Powtórz hasło
            </label>
            <input
              className="border-2 rounded-md p-1 mt-1 shadow-sm"
              required
              onChange={handleChange}
              type="password"
              name="repeatPassword"
              id="repeatPassword"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            className="mt-5 ml-auto block py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500"
            type="submit"
          >
            Zarejestruj
          </button>
        </form>
        <p className="mt-5">
          Masz już konto?{" "}
          <Link href="/login">
            <a className="border-b-2 border-blue-600 hover:text-blue-600">
              Zaloguj się
            </a>
          </Link>
        </p>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (ctx.req.cookies.authorization) {
    return {
      redirect: {
        permament: true,
        destination: "/",
      },
    };
  }
  return { props: {} };
}
