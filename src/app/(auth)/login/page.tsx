import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function page() {
  return (
    <div className=" min-h-screen my-10">
      <LoginForm />
    </div>
  );
}
