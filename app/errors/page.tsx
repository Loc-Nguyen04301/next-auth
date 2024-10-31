'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const ErrorPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const errMsg = searchParams.get('error')

    return (
        <div>
            <h1 style={{ color: "red", fontSize: "20px" }}>Erros: {errMsg}</h1>
            <button onClick={() => router.back()}>Try Again</button>
        </div>
    )
}

export default ErrorPage