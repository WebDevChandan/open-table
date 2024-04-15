import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { firstName, lastName, email, phone, city, password } = req.body;

        const errors: string[] = [];

        const validationSchema = [
            {
                valid: validator.isLength(firstName, {
                    min: 1,
                    max: 20,
                }),
                errorMessage: "First Name is invalid",
            },
            {
                valid: validator.isLength(lastName, {
                    min: 1,
                    max: 20,
                }),
                errorMessage: "Last Name is invalid",
            },
            {
                valid: validator.isEmail(email),
                errorMessage: "Email Name is invalid",
            },
            {
                valid: validator.isMobilePhone(phone),
                errorMessage: "Phone Number is invalid",
            },
            {
                valid: validator.isLength(city, {
                    min: 1,
                }),
                errorMessage: "City is invalid",
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: "Password is invalid",
            },
        ];

        validationSchema.forEach(check => {
            if (!check.valid)
                errors.push(check.errorMessage);
        })

        if (errors.length)
            return res.status(400).json({ errorMessage: errors[0] });


        const userWithEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userWithEmail)
            return res.status(400).json({ errorMessage: "Email Associated with another account" });


        res.status(200).json({
            hello: "body",
        })
    }
}