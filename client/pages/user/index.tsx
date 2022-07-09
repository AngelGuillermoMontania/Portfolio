import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import ButtonOption from '../../components/user/ButtonOption'
import ButtonLogout from '../../components/user/ButtonLogout'

const Home: NextPage = () => {

  const router = useRouter()
  const [ token, setToken ] = useState<boolean>(false)

  useEffect(() => {
    const Token = sessionStorage.getItem("Token")
    if(Token) {
      setToken(!token)
    }
  },[])

  return (
    <div className="bg-slate-900 h-screen">
      {
        token ? 
        <div>
          <div className='flex flex-wrap w-full p-4 justify-around items-center'>
            <ButtonOption href='/user/tool' title='Tool' />
            <ButtonOption href='/user/skill' title='Skill' />
            <ButtonOption href='/user/soft' title='Soft' />
          </div>
          <div className='flex flex-wrap w-full p-4 justify-around items-center'>
            <ButtonOption href='/user/resume' title='Resume' />
            <ButtonOption href='/user/reference' title='Reference' />
          </div>
          <ButtonLogout />
        </div> : <div>Not authorized</div>
      }
    </div>
  )
    
  
}

export default Home