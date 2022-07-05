import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useUser } from '@auth0/nextjs-auth0'

const Home: NextPage = () => {

  const { user, error } = useUser()

  console.log(error)
  return (
    <div>
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>
      {
        user ? 
          <div className="flex justify-center py-4">
            <Link href={"/user/tool"}>
              <button className="bg-blue-600 p-4 rounded-xl">
                <h2>Create Tool</h2>
              </button>
            </Link>
          </div>
        : <a href='/api/auth/login'>Login</a>
      }
      
    </div>
  )
}

export default Home