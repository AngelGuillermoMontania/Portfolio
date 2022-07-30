import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'
import CreateSkill from '../../../components/user/skill/createSkill'
import EditSkill from '../../../components/user/skill/editSkill'
import DeleteSkill from '../../../components/user/skill/deleteSkill'

class skills {
  "id": string
  "name": string
  "image": string
  "level": string
}

const Skill: NextPage = () => {

  const [allSkills, setAllSkills] = useState<Array<skills>>([])

  const [token, setToken] = useState<boolean>(false)

  useEffect(() => {
    const Token = sessionStorage.getItem("Token")
    if (Token) {
      setToken(!token)
    }
    axios("http://localhost:3002/skill", {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(data => setAllSkills(data.data))
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
              <CreateSkill token={sessionStorage.getItem("Token")} />
              <EditSkill token={sessionStorage.getItem("Token")} allSkills={allSkills} />
              <DeleteSkill token={sessionStorage.getItem("Token")} allSkills={allSkills} />
            </div>
            <ButtonLogout />
          </div> : <div>Not authorized</div>

      }

    </div>
  )
}

export default Skill