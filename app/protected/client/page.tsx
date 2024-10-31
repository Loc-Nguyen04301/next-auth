'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const ProtectedClientPage = () => {
    const { data: session, status } = useSession()
    console.log("Protected Client Page", { session })
    return (
        <div>
            <h1> this is <span style={{ color: "red" }}>Client side</span> protected page</h1>
            <div>You are sign in as <b>{session?.user?.name}</b></div>
        </div>
    )
}

export default ProtectedClientPage