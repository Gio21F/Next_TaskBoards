import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';


export function middleware( req: NextRequest, ev: NextFetchEvent ) {

    // if (req.page.name === '/api/entries') return NextResponse.next();

    const id = req.page.params?.id || '';

    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

    if ( !checkMongoIDRegExp.test( id ) ) {
        return new Response( JSON.stringify({ message: 'Id no valid ' + id }), {
            status: 400,
            headers: {
                'Content-Type':'application/json'
            }
        });
    }

    return NextResponse.next();

}