import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'

const ProtectedServerPage = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <h1> this is <span style={{ color: "red" }}>Server side</span> protected page</h1>
            <div>You are sign in as <b>{session?.user?.name}</b></div>
        </div>
    )
}

export default ProtectedServerPage