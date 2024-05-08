import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {

    const bearerToken = req.headers.get("authorization") as string;

    if (!bearerToken)
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized Request" }),
            { status: 401 }
        )

    const token = bearerToken.split(" ")[1];

    if (!token)
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized Request" }),
            { status: 401 }
        )

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jose.jwtVerify(token, secret);

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized Request" }),
            { status: 401 }

        )
    }


    const payload = jwt.decode(token) as { email: string };

    if (!payload.email)
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized Request" }),
            { status: 401 }
        )

}

export const config = {
    matcher: ["/api/auth/me"],
};