import { Account, JWT, Profile, Session, User } from "next-auth";

export type TypeAuthProps = {
  children: React.ReactNode;
  session: Session | null;
};
