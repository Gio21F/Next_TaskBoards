import bcrypt from 'bcryptjs';

import { db } from ".";
import { User } from "../models";

export const checkUserEmailPassword = async( email: string, password: string ) => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if ( !user ) {
        return null;
    }

    if ( !bcrypt.compareSync( password, user.password! ) ) {
        return null;
    }

    const { role, name, _id, image } = user;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
        image
    }
}

// Esta función crea o verifica el usuario de OAuth
export const oAUthToDbUser = async( oAuthEmail: string, oAuthName: string, oauthImage: string ) => {

    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });

    if ( user ) {
        await db.disconnect();
        const { _id, name, email, role, image } = user;
        return { _id, name, email, role, image };
    }

    const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'user', image: oauthImage });
    await newUser.save();
    await db.disconnect();

    const { _id, name, email, role } = newUser;
    return { _id, name, email, role };

}