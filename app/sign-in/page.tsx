'use client'
import SignInComponent from '@/components/SignInComponent'
import { signIn } from 'next-auth/react'
import React from 'react'

const SignInPage = ({ callbackUrl }: { callbackUrl: string }) => {
    return (
        <div>
            <h2>Sign In With NextAuth</h2>
            <div style={{ margin: "30px 0" }}>
                <button onClick={() => signIn('google', { callbackUrl: callbackUrl })}>
                    Continue with Google
                </button>
            </div>
            <SignInComponent callbackUrl={callbackUrl} />
        </div>
    )
}

export default SignInPage