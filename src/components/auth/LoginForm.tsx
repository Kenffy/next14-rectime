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
import { LoginSchema } from "@/schemas";
import { loginAsync } from "@/services/auth-services";
import { useSearchParams } from "next/navigation";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";


export function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      loginAsync(values, callbackUrl)
        .then((data) => {
          console.log(data)
          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data.success)
          }

        })
        .catch(() => setError("Something Went Wrong"))
    })
  }

  return (
    <div className=" w-full flex justify-center">
      <Card className=" w-[90%] md:w-[450px] p-4 flex flex-col gap-4 mt-24">
        <h2 className=" text-center text-3xl font-semibold">Login</h2>
        <div className=" flex flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Email</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} type="email" placeholder="Username" {...field} />
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
              <FormSuccess message={success} />
              <Button type="submit" className=" w-full mt-4">
                {isPending ? "Please wait..." : "Login"}
              </Button>
              <div className=" mt-3 gap-2 flex items-center justify-end text-xs">
                <span>No Account?</span>
                <Link className=" hover:underline" href="/register">
                  Register here
                </Link>
              </div>
            </form>
          </Form>
          <div className=" w-full">
            <p className=" text-xs w-full md:w-[80%] m-auto text-center">
              By logging in you are agreeing to our <b>Terms of Services</b> and{" "}
              <b>Privacy Policy</b>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
