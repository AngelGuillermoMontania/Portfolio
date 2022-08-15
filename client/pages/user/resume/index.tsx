import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import axios from 'axios'
import ButtonLogout from '../../../components/user/ButtonLogout'
import EditSpanishResume from '../../../components/user/resume/EditSpanishResume'
import EditEnglishResume from '../../../components/user/resume/EditEnglishResume'
import { Resume } from '../../../interfaces'

const Resume: NextPage = () => {

    const [resumeDB, setResumeDB] = useState<Resume>()

    const [token, setToken] = useState<boolean>(false)

    useEffect(() => {
        const Token = sessionStorage.getItem("Token")
        if (Token) {
            setToken(!token)
        }
        axios("/resume", {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(data => setResumeDB(data.data[0]))
            .catch(error => console.log(error))
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
                        <EditSpanishResume token={sessionStorage.getItem("Token")} />
                        <EditEnglishResume token={sessionStorage.getItem("Token")} />
                    </div>
                    <ButtonLogout />
                </div> : <div>Not authorized</div>
            }
        </div>
    )
}

export default Resume