"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("This is not a valid email."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className=" w-full flex justify-center">
      <Card className=" w-[90%] md:w-[450px] p-4 flex flex-col gap-4 mt-24">
        <h2 className=" text-center text-3xl font-semibold">Register</h2>
        <div className=" flex flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className=" w-full">
                Register
              </Button>
              <div className=" gap-2 flex items-center justify-end text-xs">
                <span>Already an account?</span>
                <Link className=" hover:underline" href="/login">
                  Login here
                </Link>
              </div>
            </form>
          </Form>
          <div className=" w-full">
            <p className=" text-xs w-full md:w-[80%] m-auto text-center">
              By registering in you are agreeing to our <b>Terms of Services</b>{" "}
              and <b>Privacy Policy</b>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
