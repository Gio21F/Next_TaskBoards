import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { UIContext } from '../../context/ui';


type FormData = {
    email   : string,
    password: string,
};

const Login = () => {
    const { currentTheme, changeCurrentTheme } = useContext( UIContext )
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    
    const [providers, setProviders] = useState<any>({})
    useEffect(() => {
      getProviders().then(res => {
        setProviders(res)
      })
    }, [])

    const onLoginUser = async( { email, password }: FormData ) => {

        setShowError(false);
        signIn('credentials', { email, password })

    }

    return (
        <AuthLayout title='Login' currentTheme={currentTheme} changeCurrentTheme={changeCurrentTheme}>
            <div style={{ minWidth: 300, maxWidth: 450 }} className="flex flex-col text-black dark:text-white">
                <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
                    <div className='flex flex-col p-8 mt-20 space-y-6'>

                        <p className='text-3xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Iniciar sessión</p>

                        <div style={{ display: showError ? 'flex' : 'none' }} className='w-full p-2 bg-red-500/80 rounded-lg'>
                            <p>No reconocemos ese usuario y/o contraseña</p>
                        </div>

                        <div className='font-semibold text-lg'>
                            <label htmlFor='email'>Email</label>
                            <input
                                className='w-full p-2 rounded-md bg-transparent border-b-4 border-b-indigo-600' 
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
                                className='w-full p-2 rounded-md bg-transparent border-b-4 border-b-indigo-600' 
                                type="password" 
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                            />
                            { errors.password && <p className='text-red-500'>{ errors.password.message }</p> }
                        </div>
                        <NextLink
                            href='/auth/register'
                            passHref
                        >
                            <a className='w-full text-right mt-2 opacity-60 hover:opacity-100 hover:underline'>¿No tienes una cuenta?</a>
                        </NextLink>
                        <button type="submit" className='w-full p-2 border-2 border-indigo-500/80 hover:bg-indigo-500 rounded-lg hover:text-white'>
                                Ingresar
                        </button>
                        
                    </div>
                </form>
                <div className='flex flex-col px-8 space-y-4'>
                    <p className='font-bold text-lg'>Iniciar sessión con</p>
                    <div className='flex space-y-4'>
                        {
                            Object.values(providers).map((provider:any) => {
                                if (provider.id === 'credentials') return (<div key="credentials"></div>) 
                                return (
                                    <button
                                        key={provider.id}
                                        onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
                                        className='w-full p-2 border-2 border-indigo-500/80 hover:bg-indigo-500 rounded-lg hover:text-white'
                                    >
                                        { provider.name }
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            
        </AuthLayout>
    )
}

export default Login

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
