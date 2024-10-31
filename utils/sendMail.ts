import nodemailer, { SendMailOptions } from 'nodemailer'

export const sendMail = async ({ to, url, text }: { to: string, url: string, text: string }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions: SendMailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'LOC NGUYEN | NEXT_AUTH_V4',
        html: `
         <div>
            <div>Welcome to my channel</div>
            <p>Congratuations</p>
            <a href="${url}">Click here to verify your email</a>
            <div>${url}</div>
         </div>
        `
    }

    const result = await transporter.sendMail(mailOptions)
    return result
}

