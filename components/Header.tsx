import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import SignOut from './SignOut'

const Header = async () => {
    const session = await getServerSession(authOptions)

    return (
        <header style={{ display: "flex", gap: "10px" }}>
            <Link href={"/"}>Home  </Link>
            <Link href={"/protected/client"}>protected client </Link>
            <Link href={"/protected/server"}>protected server </Link>
            {session
                ?
                <>
                    <Link href={"/profile/client"}>Profile client</Link>
                    <Link href={"/profile/server"}>Profile server</Link>
                    <Link href={"/dashboard"}>dashboard</Link>
                    <SignOut />
                </>
                :
                <>
                    <Link href={"/sign-in"}>Sign In</Link>
                    <Link href={"/sign-up"}>Sign Up</Link>
                </>
            }
        </header>
    )
}

export default Header