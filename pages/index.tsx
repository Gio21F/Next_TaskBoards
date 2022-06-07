import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Loading } from '../components/ui';

const Home: NextPage = () => {
  const router = useRouter()
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });
  
  if ( session ) {
    router.push("/dashboard");
  }

  return (
    <div className='w-full h-screen bg-white/75 dark:bg-black'>
      <Loading status={ status } />
    </div>
  )

}

export default Home
