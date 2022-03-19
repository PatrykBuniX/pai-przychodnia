import { Prisma, User } from ".prisma/client";
import getConfig from "next/config";
import { useRouter } from "next/router";
import Link from "next/link";

interface HeaderProps {
  user?: User;
}

export const Header = ({ user }: HeaderProps) => {
  const router = useRouter();
  const handleClick = async () => {
    const logoutEndpoint = `${
      getConfig().publicRuntimeConfig.BASE_URL
    }/api/auth/logout`;

    await fetch(logoutEndpoint);
    router.push("/login");
  };

  return (
    <header className="p-5 flex justify-between shadow-sm">
      <h1 className="text-3xl font-bold italic">Przychodnia</h1>
      {user && (
        <div className="ml-3 flex flex-col items-end text-right">
          <p>Zalogowano jako: {user.email}</p>
          <Link href="/wizyty">
            <a className="px-4 py-2 border-2 font-bold text-blue-600 border-blue-600 rounded-md text-sm mt-2 hover:bg-blue-300">
              Moje wizyty
            </a>
          </Link>
          <button
            className="px-4 py-2 border-2 rounded-md text-sm mt-2 hover:bg-blue-300"
            onClick={handleClick}
          >
            Wyloguj się
          </button>
        </div>
      )}
    </header>
  );
};
