import PasswordForgot from "@/app/auth/login/PasswordForgot";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password forgot",
    description: "Password forgot page",
};

export default function page() {
    return (
        <div className=" min-h-screen my-10">
            <PasswordForgot />
        </div>
    );
}
