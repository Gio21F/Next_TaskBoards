import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { Card } from '../components/ui'
const Home: NextPage = () => {  
  return (
    <Layout>
      <div className='flex space-x-4 overflow-scroll scrollbar-hide'>
        <Card status='pending' title='Pending' newEntry />
        <Card status='in-progress' title='In Progress'  />
        <Card status='finished' title='Finished' />
      </div>
    </Layout>
  )
}

export default Home
