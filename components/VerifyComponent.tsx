import { verifyWithCredentials } from '@/actions/authActions'
import React from 'react'

const VerifyComponent = async ({ token }: { token: string }) => {
    const res = await verifyWithCredentials(token)
    return (
        <div style={{ color: "green" }}>VerifyComponent</div>
    )
}

export default VerifyComponent