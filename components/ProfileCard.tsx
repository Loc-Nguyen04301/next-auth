'use client'
import Image from 'next/image';
import React from 'react'

const ProfileCard = ({ user }: {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | undefined
}) => {
    return (
        <div>
            <h2 style={{ color: "red" }}>Name: {user?.name}</h2>
            <Image src={user?.image || ""} alt={'123'} width={100} height={100} />

            <h2>Email: {user?.email}</h2>
        </div>
    )
}

export default ProfileCard