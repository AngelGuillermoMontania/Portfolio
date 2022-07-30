import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'
import CreateReference from '../../../components/user/reference/createReference'
import EditReference from '../../../components/user/reference/editReference'
import DeleteReference from '../../../components/user/reference/deleteReference'

class reference {
  "id": string
  "name": string
  "image": string
  "message": string
}

const Reference: NextPage = () => {

  const [allReferences, setAllReferences] = useState<Array<reference>>([])

  const [token, setToken] = useState<boolean>(false)

  useEffect(() => {
    const Token = sessionStorage.getItem("Token")
    if (Token) {
      setToken(!token)
    }
    axios("http://localhost:3002/reference", {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(data => setAllReferences(data.data))
        .catch(error => console.log(error))
  }, [])

  return (
    <div className="bg-slate-900 h-screen">
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>
      {
        token ?
          <div className="flex flex-col h-full justify-around items-center py-4">
            <Link href="/user" >
              <p className='bg-blue-900 p-4 rounded-xl text-white shadow-md shadow-white hover:bg-blue-600 hover:text-black'>
                /USER
              </p>
            </Link>
            <div className='h-5/6'>
              <CreateReference token={sessionStorage.getItem("Token")} />
              <EditReference token={sessionStorage.getItem("Token")} allReferences={allReferences} />
              <DeleteReference token={sessionStorage.getItem("Token")} allReferences={allReferences} />
            </div>
            <ButtonLogout />
          </div> : <div>Not authorized</div>

      }

    </div>
  )
}

export default Reference