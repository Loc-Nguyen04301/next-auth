import User from "@/models/userModel";
import connectDB from "@/utils/database";
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

connectDB()

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string, password: string }

                const user = await signInCredentials({ email, password })
                console.log({ credentials, req, user })
                return user
            }
        })
    ],
    pages: {
        signIn: "/sign-in",
        error: "/errors",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('sign_in', { user, account, profile })
            if (account?.type === 'oauth') {
                return await signInWithOAuth({ account, profile });
            }
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async jwt({ token, user, account, profile, session, trigger }) {
            console.log('jwt', { token, user, account, profile, session, trigger })
            if (trigger === 'update') {
                token.name = session.name
                token.picture = session.image
            }
            else {
                const userDB = await getUserByEmail({
                    email: token.email || ""
                })
                token.name = userDB.name
                token.picture = userDB.image
            }

            return token
        },
        async session({ session, token }) {
            console.log('session', { session, token })
            return session
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

async function signInWithOAuth({ account, profile }: { account: any, profile: any }) {
    const user = await User.findOne({ email: profile.email })
    if (user) return true

    const newUser = new User({
        name: profile.name,
        email: profile.email,
        image: profile.image,
        provider: account.provider
    })

    await newUser.save()

    return true
}

async function getUserByEmail({ email }: { email: string }) {
    const user = await User.findOne({ email }).select("-password")
    if (!user) throw new Error('Email does not exist')

    return { ...user._doc, _id: user._id.toString() }
}

export const signInCredentials = async ({ email, password }: { email: string, password: string }) => {
    const matchUser = await User.findOne({ email: email })
    if (!matchUser) throw new Error("Email not found")

    if (password !== matchUser.password) throw new Error("password not match")
    return { ...matchUser._doc, _id: matchUser._id.toString() }
}