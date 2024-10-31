'use client'
import React from 'react'
import ProfileCard from './ProfileCard';
import ProfileUpdate from './ProfileUpdate';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import ChangePassword from './ChangePassword';

const ProfileComponent = ({ user }: {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | undefined,
}) => {
    // update method that can be used to update the session, without reloading the page.
    const { data: session, update } = useSession()

    return (
        <>
            <ProfileCard user={session?.user || user} />
            <ProfileUpdate update={update} />
            <ChangePassword />
        </>
    )
}

export default ProfileComponent