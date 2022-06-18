import NextAuth from "next-auth"
import { IUser } from "../interfaces";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    // expiresIn: string | null;
    user: IUser
  }
}