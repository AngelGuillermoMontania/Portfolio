import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>
      <Link href={"/user"}>User</Link>
    </div>
  )
}

export default Home
