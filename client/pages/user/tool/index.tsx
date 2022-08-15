import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import axios from 'axios'
import ButtonLogout from '../../../components/user/ButtonLogout'
import CreateTool from '../../../components/user/tool/createTool'
import EditTool from '../../../components/user/tool/editTool'
import DeleteTool from '../../../components/user/tool/deleteTool'

import { Tool } from '../../../interfaces'

const Tool: NextPage = () => {

    const [allTools, setAllTools] = useState<Array<Tool>>([])
    const [token, setToken] = useState<boolean>(false)
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    useEffect(() => {
        axios("/tool", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data =>
                setAllTools(data.data)
            )
            .catch(error => console.log(error))
        axios("/auth/verify", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => setToken(true))
            .catch(error => setToken(false))
    }, [])


    return (
        <div className="bg-slate-900 h-screen">
            <Head>
                <title>Angel Guillermo Montaña</title>
            </Head>
            {
                token ? <div className="flex flex-col h-full justify-around items-center py-4">
                    <Link href="/user" >
                        <p className='bg-blue-900 p-4 rounded-xl text-white shadow-md shadow-white hover:bg-blue-600 hover:text-black'>
                            /USER
                        </p>
                    </Link>
                    <div className='h-5/6'>
                        <CreateTool token={sessionStorage.getItem("Token")} />
                        <EditTool token={sessionStorage.getItem("Token")} allTools={allTools} />
                        <DeleteTool token={sessionStorage.getItem("Token")} allTools={allTools} />
                    </div>
                    <ButtonLogout />
                </div> : <div>Not authorized</div>
            }
        </div>
    )
}

export default Tool