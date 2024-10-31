import jwt from 'jsonwebtoken'

export const generateToken = (payload: any) => {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
        throw new Error('TOKEN_SECRET is not defined');
    }

    return jwt.sign(payload, secret, { expiresIn: '1d' })
}

export const verifyToken = (token: string) => {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
        throw new Error('TOKEN_SECRET is not defined');
    }

    return jwt.verify(token, secret)
}