import { Session } from "next-auth";

export type TypeAuthProps = {
  children: React.ReactNode;
  session: Session | null;
};
