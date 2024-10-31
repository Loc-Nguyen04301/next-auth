'use client'
import React from 'react'
import Form from './Form'
import { updateUser } from '@/actions/authActions'
import { Session } from 'next-auth'
import Button from './Button'

type UpdateSession = (data?: {
    name: string,
    image: string
}) => Promise<Session | null>

const ProfileUpdate = ({ update }: { update?: UpdateSession; }) => {
    const handleUpdateProfile = async (formdata: FormData) => {
        const name = formdata.get("name") as string
        const image = formdata.get("image") as string
        if (update) {
            update({ image, name })
        }

        const res = await updateUser({ image, name })
        if (res.msg) alert(res.msg)
    }

    return (
        <div>
            <h2>Update Profile</h2>

            <Form action={handleUpdateProfile}>
                <input name='name' placeholder='Name' required />
                <input name='image' placeholder='Image' required />
                <Button value='Update Profile' />
            </Form>

            
        </div >
    )
}

export default ProfileUpdate