import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ProfileComponent from '@/components/ProfileComponent'
import { getServerSession } from 'next-auth'
import React from 'react'

const ProfileServerPage = async () => {
    const session = await getServerSession(authOptions)
    console.log('Profile Server Page', { session })

    return (
        <>
            <div style={{ color: 'red', fontWeight: "bold" }}>Profile Server Page</div>
            <ProfileComponent user={session?.user} />
        </>
    )
}

export default ProfileServerPage