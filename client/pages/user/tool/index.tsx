import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import CreateTool from '../../../components/user/tool/createTool'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Home: NextPage = () => {

  const [ userDB, setUserDB ] = useState<boolean>(false)
  const router = useRouter()
  
/* 
  useEffect(() => {
    if(user) {
      axios(`http://localhost:3001/user?email=${user.email}`)
        .then(data => setUserDB(data.data.exist))
    }
    console.log(userDB)
    if(!userDB) {
        router.push("/api/auth/logout")
    } 
  }, [user]) */

  return (
    <div className="bg-slate-900">
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>
      {
        userDB ?
          <div className="h-screen flex justify-around items-center py-4">
            <CreateTool />
          </div>
        :   <div className="bg-slate-900 h-full screen flex items-center justify-around">
            <p className="text-white">Your email not is correct</p>
            <a href='/api/auth/login' className="text-white bg-red-600 p-2">LogIn</a>
        </div>
      }

    </div>
  )
}

export default Home