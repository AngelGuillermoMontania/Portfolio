import axios from 'axios'
import { Html, Head, Main, NextScript } from 'next/document'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

export default function Document() {
    return (
        <Html lang='es' className='scroll-smooth'>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Acme&family=Averia+Sans+Libre:wght@300&family=Kalam&family=Mochiy+Pop+One&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body className='bg-blackPrimary font-[Acme] dark:bg-gray-300'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}