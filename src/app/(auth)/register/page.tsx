import { RegisterForm } from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
};

export default function page() {
  return (
    <div className=" min-h-screen my-10">
      <RegisterForm />
    </div>
  );
}
