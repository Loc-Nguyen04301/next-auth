'use client'
import React from 'react'
import Form from './Form'
import Button from './Button'
import { changePasswordWithCredentials } from '@/actions/authActions'

const ChangePassword = () => {
    const handleChangePassword = async (formData: FormData) => {
        const oldPassword = formData.get("old_password") as string
        const newPassword = formData.get("new_password") as string
        const res = await changePasswordWithCredentials({ oldPassword, newPassword })
        console.log({ res, oldPassword, newPassword })
    }

    return (
        <Form action={handleChangePassword} style={{ margin: "30px 0" }}>
            <input name='old_password' placeholder='old_password' type='text' required />
            <input name='new_password' placeholder='new_password' type='text' required />
            <Button value='Change Password' />
        </Form>
    )
}

export default ChangePassword