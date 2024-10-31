'use client'
import React from 'react'
import Form from './Form'
import Button from './Button'
import { signIn } from "next-auth/react"

const SignInComponent = ({ callbackUrl }: { callbackUrl: string }) => {
    const handleSignInCredentials = async (formData: FormData) => {
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        await signIn('credentials', { email, password, callbackUrl },)
    }

    return (
        <Form action={handleSignInCredentials} style={{ margin: "30px 0" }}>
            <input name='email' placeholder='Email' type='email' required />
            <input name='password' placeholder='Password' type='password' required />
            <Button value='Sign in' />
        </Form>
    )
}

export default SignInComponent