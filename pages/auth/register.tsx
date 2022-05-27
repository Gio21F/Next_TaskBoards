import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react'
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { AuthContext } from '../../context/auth';
import { validations } from '../../utils';

type FormData = {
    name    : string;
    email   : string;
    password: string;
};


const Register = () => {
    const router = useRouter();
    const { registerUser } = useContext( AuthContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const onRegisterForm = async( {  name, email, password }: FormData ) => {
        
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        signIn('credentials', { email, password })

    }
    return (
        <AuthLayout title='Register'>
                <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate>
                    <div style={{ minWidth: 300, maxWidth: 450 }} className='flex flex-col p-10 mt-20 text-white rounded-md space-y-4'>
                        <p className='text-3xl font-bold mb-5'>Crear cuenta</p>

                        <div style={{ display: showError ? 'flex' : 'none' }} className='w-full p-2 bg-red-500/80 rounded-lg'>
                            <p>Algo salió mal, intentelo más tarde</p>
                        </div>

                        <div className='font-semibold text-lg'>
                            <label htmlFor='name'>Nombre completo</label>
                            <input
                                className='w-full p-2 rounded-md text-black'
                                type="text" 
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                            />
                            { errors.name && <p className='text-red-500'>{ errors.name.message }</p> }
                        </div>
                        <div className='font-semibold text-lg'>
                            <label htmlFor='email'>Email</label>
                            <input
                                className='w-full p-2 rounded-md text-black' 
                                type="email" 
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                            />
                            { errors.email && <p className='text-red-500'>{ errors.email.message }</p> }
                        </div>
                        <div className='font-semibold text-lg'>
                            <label htmlFor='password'>Password</label>
                            <input 
                                className='w-full p-2 rounded-md text-black' 
                                type="password" 
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                            />
                            { errors.password && <p className='text-red-500'>{ errors.password.message }</p> }
                        </div>
                        <button type='submit' className='w-full p-2 border-2 border-indigo-500/80 hover:bg-indigo-500 rounded-lg'>
                                Ingresar
                        </button>
                        <NextLink
                            href='/auth/login'
                            passHref
                        >
                            <a className='w-full text-right text-gray-500 mt-2 text-sm hover:text-white hover:underline'>¿Ya tienes una cuenta?</a>
                        </NextLink>
                    </div>
                </form>
            </AuthLayout>
    )
}

export default Register;

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({req})
    if ( session ) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}
