'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

const Button = ({ value, ...props }: { value: string }) => {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending}>
            {pending ? 'Loading' : value}
        </button>
    )
}

export default Button