import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});

    if ( !session ) {
        console.log(session);
        const { origin } = req.nextUrl.clone();
        return NextResponse.redirect(`${ origin }/auth/login`);
    }

    return NextResponse.next();
}