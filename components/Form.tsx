'use client'
import React, { FormHTMLAttributes, useRef } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    action: (formdata: FormData) => Promise<void>;
    children: React.ReactNode;
}

const Form = (
    { action, children, ...props }: FormProps
) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleAction = async (formdata: FormData) => {
        await action(formdata)
        formRef.current?.reset()
    }

    return (
        <form ref={formRef} action={handleAction} {...props}>
            {children}
        </form>
    )
}

export default Form