import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'



const Home: NextPage = () => {

    const baseUrl = process.env.NEXT_PUBLIC_API

    const [userForm, setUserForm] = useState<Object>({
        email: "",
        password: ""
    })

    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const tokenApi = await axios.post(`/auth/login`, userForm)
            sessionStorage.setItem('Token', tokenApi.data.access_token)
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    const handleUserForm = async (e: ChangeEvent<HTMLInputElement>) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="bg-slate-900 h-screen w-screen flex justify-center items-center">
            <Head>
                <title>Angel Guillermo Montaña</title>
            </Head>
            {
                <form onSubmit={e => onSubmit(e)} className="flex flex-col w-full h-1/5 justify-around items-center">
                    <div>
                        <label className='text-white'>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='email'
                            onChange={e => handleUserForm(e)}
                            className="mx-2 text-center p-1"
                        />
                    </div>
                    <div>
                        <label className='text-white'>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='password'
                            onChange={e => handleUserForm(e)}
                            className="mx-2 text-center p-1"
                        />
                    </div>
                    <button type='submit' className='bg-green-600 p-4 rounded-2xl hover:bg-yellow-700'>
                        Login
                    </button>
                </form>
            }
        </div>
    )
}

export default Home