import { Prisma, User } from "@prisma/client";
import { ReactNode } from "react";
import useCookiesBar from "../../lib/useCookieBar";
import { CookieBar } from "../CookieBar/CookieBar";
import { Header } from "../Header/Header";

interface LayoutProps {
  user?: User;
  children: ReactNode;
}

export const Layout = ({ children, user }: LayoutProps) => {
  const { hideCookiesBar, isCookiesBarHidden } = useCookiesBar();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <div className="flex-1">{children}</div>
      <footer className="flex justify-end p-4 mt-auto">
        <p>
          Przygotował:{" "}
          <span className="font-bold italic text-blue-600">
            Patryk Górka 4h
          </span>
        </p>
      </footer>
      {!isCookiesBarHidden && <CookieBar hideCookiesBar={hideCookiesBar} />}
    </div>
  );
};
