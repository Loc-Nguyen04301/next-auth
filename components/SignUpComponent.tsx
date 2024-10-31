'use client'
import React from 'react'
import Form from './Form'
import Button from './Button'
import { signUpCredentials } from '@/actions/authActions'

const SignUpComponent = () => {
    const handleSignUpCredentials = async (formData: FormData) => {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const res = await signUpCredentials({ email, name, password })
        if (res?.msg) alert(res.msg)
    }

    return (
        <>
            <h1 style={{ color: "red", fontSize: "50px" }}>Sign up</h1>
            <Form action={handleSignUpCredentials} style={{ margin: "30px 0" }}>
                <input name='name' placeholder='Name' required />
                <input name='email' placeholder='Email' type='email' required />
                <input name='password' placeholder='Password' type='password' required />
                <Button value='Sign up' />
            </Form>
        </>
    )
}

export default SignUpComponent