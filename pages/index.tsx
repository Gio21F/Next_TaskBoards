import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { Card } from '../components/ui'
import { NewList } from '../components/ui/NewList'
import { signOut } from 'next-auth/react';

const Home: NextPage = () => {

  return (
    <button onClick={ () => signOut() }>
      Cerrar sesión
    </button>
    // <Layout>
    //   <div className='flex space-x-4 overflow-scroll scrollbar-hide'>
    //     <Card status='pending' title='Pending' newEntry />
    //     <Card status='in-progress' title='In Progress'  />
    //     <Card status='finished' title='Finished' />
    //     <NewList />
    //   </div>
    // </Layout>
  )
}

export default Home
