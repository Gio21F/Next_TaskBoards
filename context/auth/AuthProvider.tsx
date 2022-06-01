import { FC, useReducer, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react'

import Cookies from 'js-cookie';
import axios from 'axios';

import { AuthContext, authReducer } from './';
import { tasksApi } from '../../api';
import { IUser } from '../../interfaces';

interface Props {
    children: ReactNode
}
export interface AuthState {
    isLoggedIn: boolean;
    user: IUser | null;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: null,
}

export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const { data, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data.user as IUser });
        }
    }, [data, status]);

    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await tasksApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }

    const registerUser = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await tasksApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        signOut();
        dispatch({ type: '[Auth] - Logout' });
        // Para nuestra autenticacion personalizada
        // Cookies.remove('token');
        // router.reload();

    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout

        }}>
            { children }
        </AuthContext.Provider>
    )
};