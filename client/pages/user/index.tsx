import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import ButtonOption from '../../components/user/ButtonOption'
import ButtonLogout from '../../components/user/ButtonLogout'
import axios from 'axios'
import Head from 'next/head'

const Home: NextPage = () => {

  const router = useRouter()
  const [ token, setToken ] = useState<boolean>(false)

  useEffect(() => {
    axios("http://localhost:3002/auth/verify", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        }).then(data => setToken(true))
            .catch(error => setToken(false))
  },[])

  return (
    <div className="bg-slate-900 h-screen">
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>

      <div className="cursor">
        <div className="cursor__inner"></div>
      </div>
      {
        token ? 
        <div className='h-full flex flex-col items-center'>
          <div className='flex flex-wrap w-full p-4 justify-around items-center'>
            <ButtonOption href='/user/tool' title='Tool' />
            <ButtonOption href='/user/skill' title='Skill' />
            <ButtonOption href='/user/soft' title='Soft' />
          </div>
          <div className='flex flex-wrap w-full p-4 justify-around items-center'>
            <ButtonOption href='/user/resume' title='Resume' />
            <ButtonOption href='/user/reference' title='Reference' />
          </div>
          <div className='flex flex-wrap w-full p-4 justify-around items-center'>
            <ButtonOption href='/user/project' title='Project' />
          </div>
          <div className='flex flex-wrap w-full p-4 justify-around items-center'>
            <ButtonOption href='/user/message' title='Messages' />
          </div>
          <div className='flex flex-wrap w-full p-4 justify-around items-center'>
            <ButtonOption href='/user/contact' title='Contact' />
            <ButtonOption href='/user/about' title='About' />
          </div>
          <ButtonLogout />
        </div> : <div>Not authorized</div>
      }
    </div>
  )
    
  
}

export default Home