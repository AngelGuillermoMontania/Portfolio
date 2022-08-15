import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import ButtonOption from '../../components/user/ButtonOption'
import ButtonLogout from '../../components/user/ButtonLogout'
import { MouseEvent, useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'

const Home: NextPage = () => {

    const router = useRouter()
    const [token, setToken] = useState<boolean>(false)
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    const onMouseMove = (elem: Element | null, e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (elem) {
            elem?.setAttribute('style', `--cursor-x: ${e.clientX + 'px'}; --cursor-y: ${e.clientY + 'px'}`)
        }
    }

    useEffect(() => {
        axios("/auth/verify", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
        .then(data => setToken(true))
        .catch(error => setToken(false))
    }, [])

    return (
        <div className="bg-slate-900 h-screen" >
            <Head>
                <title>Angel Guillermo Montaña</title>
            </Head>
            <div className="cursor">
                <div className="cursor__inner"></div>
            </div>
            {
                token ? <div className='h-full flex flex-col items-center'>
                    <div className='flex flex-wrap w-full p-4 justify-around items-center'>
                        <ButtonOption href='/user/tool' title='Tool' />
                        <ButtonOption href='/user/skill' title='Skill' />
                        <ButtonOption href='/user/soft' title='Soft' />
                    </div>
                    <div className='flex flex-wrap w-full p-4 justify-around items-center'>
                        <ButtonOption href='/user/resume' title='Resume' />
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