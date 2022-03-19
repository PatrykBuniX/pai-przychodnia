import { Prisma, User } from "@prisma/client";
import { ReactNode } from "react";
import { Header } from "../Header/Header";

interface LayoutProps {
  user?: User;
  children: ReactNode;
}

export const Layout = ({ children, user }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <div className="flex-1">{children}</div>
      <footer></footer>
    </div>
  );
};
