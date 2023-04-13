// https://nextui.org/docs/guide/getting-started
import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';

interface CustomPageProps { }

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
    return (
        <NextUIProvider>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}

export default MyApp;