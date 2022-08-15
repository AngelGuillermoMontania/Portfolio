import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'
import CreateSoft from '../../../components/user/soft/createSoft'
import EditSoft from '../../../components/user/soft/editSoft'
import DeleteSoft from '../../../components/user/soft/deleteSoft'
import { Soft } from '../../../interfaces'

const Soft: NextPage = () => {

    const [allSofts, setAllSofts] = useState<Array<Soft>>([])

    const [token, setToken] = useState<boolean>(false)

    useEffect(() => {
        axios("/auth/verify", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => setToken(true))
            .catch(error => setToken(false))
        axios("/soft", {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(data => setAllSofts(data.data))
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
                            <CreateSoft token={sessionStorage.getItem("Token")} />
                            <EditSoft token={sessionStorage.getItem("Token")} allSofts={allSofts} />
                            <DeleteSoft token={sessionStorage.getItem("Token")} allSofts={allSofts} />
                        </div>
                        <div className='h-5/6'>

                        </div>
                        <ButtonLogout />
                    </div> : <div>Not authorized</div>
            }
        </div>
    )
}

export default Soft