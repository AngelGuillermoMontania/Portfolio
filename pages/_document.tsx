import axios from 'axios'
import { Html, Head, Main, NextScript } from 'next/document'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

export default function Document() {
    return (
        <Html lang='es' className='scroll-smooth'>
            <Head>
                
            </Head>
            <body className='bg-blackPrimary font-Acme dark:bg-gray-300'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}