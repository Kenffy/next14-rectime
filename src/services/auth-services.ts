"use server";

import * as z from "zod"
import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetSchema } from "@/schemas";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
//import { generateVerificationToken } from "@/lib/tokens";
//import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "./user-services";
import { signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
import { DEFAULT_REDIRECT_ROUTES } from "../../route";
import { USER_ROLE } from "@/types/types";

export const registerAsync = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values)
    if (!validateFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password, name } = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email Already Exists!" }
    }

    await db.user.create({
        data: {
            email,
            name,
            role: USER_ROLE,
            password: hashedPassword,
        }
    })

    //TODO verification email
    // const verificationToken = await generateVerificationToken(email)
    // await sendVerificationEmail(
    //     verificationToken.email,
    //     verificationToken.token
    // )

    return { success: "Confirmation Email Sent" }
}


export const loginAsync = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validateFields = LoginSchema.safeParse(values)
    if (!validateFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password } = validateFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email Is Not Exist" }
    }

    // if (!existingUser.emailVerified) {
    //     const verificationToken = await generateVerificationToken(email)
    //     await sendVerificationEmail(verificationToken.email, verificationToken.token)
    //     return { success : "Confirmation Email Sent" }
    // }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_REDIRECT_ROUTES
        })

        return { success: "Login success." }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Email or Password!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error
    }

}

// export const changePasswordAsync = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
//     if(!token) return {error : "Token Not Found!!"}

//     const validateFields = NewPasswordSchema.safeParse(values)
//     if (!validateFields.success) return {error : "Invalid Fields!"}

//     const {password} = validateFields.data
//     const hashedPassword = await bcrypt.hash(password, 10)

//     const existingToken = await getResetPasswordTokenByToken(token)
//     if(!existingToken) return {error : "Invalid Token!"}

//     const existingUser = await getUserByEmail(existingToken.email)
//     if(!existingUser) return { error: "Email Doesn't Exist" }

//     await db.user.update({
//         where : {id : existingUser.id},
//         data : {password : hashedPassword}
//     })

//     await db.resetPasswordToken.delete({
//         where : {id : existingToken.id}
//     })

//     return {success : "Password Updated!"}
// }

export const resetPasswordAsync = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values)

    console.log(validateFields);


    if (!validateFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email } = validateFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: "Email Is Not Exist" }
    }



    // TODO

    // const resetPasswordToken = await generateResetPasswordToken(email)
    // await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token)

    return { success: "Reset Email Sent" }
}

export const logoutAsync = async () => {
    await signOut()
}

export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await db.account.findFirst({ where: { userId } })
        return account
    } catch {
        return null
    }
}

// export const getVerifyTokenByToken = async (token: string) => {
//     try {
//         const verificationToken = await db.verificationToken.findUnique({ where: { token } })
//         return verificationToken
//     } catch {
//         return null
//     }
// }

// export const getVerifyTokenByEmail = async (email : string) => {
//     try {
//         const verificationToken = await db.verificationToken.findFirst({ where: { email} })
//         return verificationToken
//     } catch {
//         return null
//     }
// }

// export const getTwoFactorTokenByToken = async (token: string) => {
//     try {
//         const twoFactorToken = await db.twoFactorToken.findUnique({ where: { token } })
//         return twoFactorToken;
//     } catch {
//         return null
//     }
// }

// export const getTwoFactorTokenByEmail = async (email : string) => {
//     try {
//         const twoFactorToken = await db.twoFactorToken.findFirst({ where: { email } })
//         return twoFactorToken;
//     } catch {
//         return null
//     }
// }

// export const getResetPasswordTokenByToken = async (token: string) => {
//     try {
//         const passwordToken = await db.resetPasswordToken.findUnique({ where: { token } })
//         return passwordToken
//     } catch {
//         return null
//     }
// }

// export const getResetPasswordTokenByEmail = async (email: string) => {
//     try {
//         const passwordToken = await db.resetPasswordToken.findFirst({ where: { email } })
//         return passwordToken
//     } catch {
//         return null
//     }
// }

// export const getTokenConfirmationByUserId = async (userId: string) => {
//     try {
//         const twoFactorToken = await db.twoFactorConfirmation.findUnique({ where: { userId } });
//         return twoFactorToken;
//     } catch {
//         return null;
//     }
// }