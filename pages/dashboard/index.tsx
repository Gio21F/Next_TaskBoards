import { GetServerSideProps } from 'next'
import { Layout } from '../../components/layouts';
import { ContainerBoards } from '../../components/Boards';
import { getSession } from 'next-auth/react';

const PageDashboard = () => {
  return (
    <Layout title='Dashboard'>
      <ContainerBoards />
    </Layout>
  )
}

export default PageDashboard

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session: any = await getSession({ req });
  if ( !session ) {
      return {
          redirect: {
              destination: '/auth/login',
              permanent: false,
          }
      }
  }


  return { props: {} }
}
