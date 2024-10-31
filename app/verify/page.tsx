import VerifyComponent from '@/components/VerifyComponent'
import React from 'react'

const VerifyPage = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const token = searchParams.token as string
    return (
        <>
            <h1>VerifyPage</h1>
            <VerifyComponent token={token} />
        </>
    )
}

export default VerifyPage