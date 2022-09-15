import '../styles/globals.css'
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from './api/trpc/[trpc]';
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

function MyApp({
    Component,
    pageProps: {
        session,
        ...pageProps
    },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default withTRPC<AppRouter>({
    config({ ctx }) {
      const url = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/trpc`
        : 'http://localhost:3000/api/trpc';
      return {
        url,
      };
    },
    ssr: true,
  })(MyApp);

