'use server'
import { getServerSession } from "next-auth"
import User from "@/models/userModel"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { generateToken, verifyToken } from "@/utils/token"
import { sendMail } from "@/utils/sendMail"

const BASE_URL = process.env.NEXTAUTH_URL || ""

type PayloadToken = { email: string, name: string, password: string }

export const updateUser = async ({ name, image }: { name: string, image: string }) => {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("Unauthorization")

    try {
        const user = await User.findOneAndUpdate({ email: session.user?.email }, { name, image }, { new: true }).select("-password")
        if (!user) throw new Error("Email doesn't exist")

        return { msg: "Update Profile Success" }
    } catch (error: any) {
        redirect(`/errors?error=${error.message}`)
    }
}

export const signUpCredentials = async ({ email, name, password }: PayloadToken) => {
    try {
        const existedUser = await User.findOne({ email: email }).select("-password")
        if (existedUser) throw new Error("Email existed")

        const token = generateToken({ email, name, password })
        await sendMail({
            to: email,
            text: "VERIFY EMAIL",
            url: `${BASE_URL}/verify?token=${token}`
        })

        return { msg: "Register Successfull. Please active it" }
    } catch (error: any) {
        console.log({ error })
        redirect(`/errors?error=${error.message}`)
    }
}

export const verifyWithCredentials = async (token: string) => {
    try {
        const { email, name, password } = verifyToken(token) as PayloadToken

        const userExist = await User.findOne({ email: email })
        if (userExist) throw new Error("Email is existed")

        const newUser = new User({
            name: name,
            email: email,
            password: password,
        })

        await newUser.save()
        return { msg: "Register Successfull. Please active it" }
    } catch (error: any) {
        console.log({ error })
        redirect(`/errors?error=${error.message}`)
    }
}

export const changePasswordWithCredentials = async ({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }) => {
    try {
        const session = await getServerSession()
        const email = session?.user?.email

        const userExist = await User.findOne({ email: email })
        if (!userExist) throw new Error("Email is not existed. Can't change password")

        //compare old password input and database 
        // ...
        await User.findOneAndUpdate({ email: email }, { password: newPassword })

        return { msg: "Update Password " }
    } catch (error: any) {
        console.log({ error })
        redirect(`/errors?error=${error.message}`)
    }
}

