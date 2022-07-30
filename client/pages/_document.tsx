import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='es' className='scroll-smooth' onScroll={() => console.log("hello")}>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Kalam&display=swap" rel="stylesheet" />
      </Head>
      <body className='bg-[#161616] font-[Kalam] text-[#ECDBBA]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}