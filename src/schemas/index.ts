import * as z from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 character"
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is Required"
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is Required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is Required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 character"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
})