import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { props } from '../../components/user/ButtonOption'

import Button from '../../components/user/ButtonOption'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

const Home: NextPage = () => {

  const [ userForm, setUserForm ] = useState<Object>({
    email: "",
    password: ""
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const tokenApi = await axios.post("http://localhost:3001/auth/login", userForm)
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
      {/* <div>
        <div className="flex justify-around items-center py-4">
          <Button title={"Tool"} href={"/user/tool"}/>
        </div>
        <a href="/api/auth/logout" className="text-white bg-red-600 p-2">LogOut</a>
      </div> */}
    </div>
  )
}

export default Home