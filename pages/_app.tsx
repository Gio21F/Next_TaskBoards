import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UIProvider } from '../context/ui'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/auth';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import { BoardsProvider } from '../context/boards';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <UIProvider>
          <BoardsProvider>
            <NextNProgress
                color="#3A64D8"
                startPosition={0.3}
                stopDelayMs={200}
                height={4}
                showOnShallow={true}
              />
              <Component {...pageProps} />
            <ToastContainer />
          </BoardsProvider>
        </UIProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

export default MyApp
