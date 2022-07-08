import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'
import CreateSkill from '../../../components/user/skill/createSkill'
/* import EditSkill from '../../../components/user/tool/editSkill'
import DeleteSkill from '../../../components/user/tool/deleteSkill' */

class tools {
  "id": string
  "name": string
  "image": string
  "level": string
}

const Skill: NextPage = () => {

  const [userDB, setUserDB] = useState<boolean>(false)
  const [allSkills, setAllSkills] = useState<Array<tools>>([])

  const [token, setToken] = useState<boolean>(false)

  useEffect(() => {
    const Token = sessionStorage.getItem("Token")
    if (Token) {
      setToken(!token)
    }
    axios("http://localhost:3001/skill", {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(data => setAllSkills(data.data))
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
              <CreateSkill token={sessionStorage.getItem("Token")} allSkills={allSkills} />
{/*               <EditTool token={sessionStorage.getItem("Token")} allTools={allTools} />
              <DeleteTool token={sessionStorage.getItem("Token")} allTools={allTools} /> */}
            </div>
            <ButtonLogout />
          </div> : <div>Not authorized</div>

      }

    </div>
  )
}

export default Skill