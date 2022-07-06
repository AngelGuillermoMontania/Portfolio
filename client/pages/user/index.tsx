import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { props } from '../../components/user/Button'

import Button from '../../components/user/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Router, { useRouter } from 'next/router'

const Home: NextPage = () => {


  //ELIMINAR JWT DESDE SESSIONSTORAGE

  const [ userDB, setUserDB ] = useState<boolean>(false)
  const router = useRouter()

 /*  useEffect(() => {
    if(user) {
      axios(`http://localhost:3001/user?email=${user.email}`)
        .then(data => setUserDB(data.data.exist))
    }
  }, [user]) */

  console.log(userDB)

  return (
    <div className="bg-slate-900 h-screen">
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>
      {

          <div>
            <div className="flex justify-around items-center py-4">
              <Button title={"Tool"} href={"/user/tool"}/>
            </div>
            <a href="/api/auth/logout" className="text-white bg-red-600 p-2">LogOut</a>
          </div>
      }
    </div>
  )
}

export default Home