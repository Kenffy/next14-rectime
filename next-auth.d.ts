import { ADMIN_ROLE, USER_ROLE } from "@/types/types";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: typeof USER_ROLE | typeof ADMIN_ROLE
    email: string
    name: string
    isOauth: boolean
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}