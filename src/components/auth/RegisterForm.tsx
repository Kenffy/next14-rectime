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
import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import { registerAsync } from "@/services/auth-services";
import { FormError } from "../FormError";


export function RegisterForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      registerAsync(values)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="Name" {...field} />
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
                      <Input disabled={isPending} placeholder="Email" {...field} />
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
                      <Input disabled={isPending}
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <Button type="submit" className=" w-full">
                {isPending ? "Please wait..." : "Register"}
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
