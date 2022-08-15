import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'
import { Message } from '../../../interfaces'

const Message: NextPage = () => {

    const [allMessages, setAllMessages] = useState<Array<Message>>([])

    const [token, setToken] = useState<boolean>(false)

    useEffect(() => {
        axios("/auth/verify", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => setToken(true))
            .catch(error => setToken(false))
        axios("/message", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => setAllMessages(data.data))
            .catch(error => console.log(error))
    }, [])

    const deleteMessage = async (id: string) => {
        try {
            const deleteMessage = await axios.delete(`/message?id=${id}`, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
            })
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

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
                        {
                            allMessages.map(message => <div className='my-4 bg-black rounded-3xl text-slate-300 p-4 flex flex-col items-center'>
                                <div className='flex flex-wrap'>
                                    <p className='mx-4 my-4'>TITLE: {message.title}</p>
                                    <p className='mx-4 my-4'>EMAIL: {message.email}</p>
                                    <p className='mx-4 my-4'>CREATE: {message.create}</p>
                                    <p className='mx-4 my-4'>BODY: {message.body}</p>
                                    <p className='mx-4 my-4'>COMPANY: {message.company}</p>
                                </div>
                                <button
                                    className='bg-red-600 rounded-2xl w-1/5 text-lg transition-all hover:bg-red-300 hover:text-black'
                                    onClick={e => deleteMessage(message.id)}
                                >DELETE</button>
                            </div>)
                        }
                    </div>
                    <ButtonLogout />
                </div> : <div>Not authorized</div>
            }
        </div>
    )
}

export default Message