"use client"
import ProfileComponent from '@/components/ProfileComponent'
import { useSession } from 'next-auth/react'
import React from 'react'

const ProfileClientPage = () => {
    const { data: session } = useSession()
    console.log('Profile Client Page', { session })

    return (
        <>
            <div style={{ color: 'red', fontWeight: "bold" }}>Profile Client Page</div>
            <ProfileComponent user={session?.user} />
        </>
    )
}

export default ProfileClientPage