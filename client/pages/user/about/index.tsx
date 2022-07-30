import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'
import CreateReference from '../../../components/user/reference/createReference'
import EditReference from '../../../components/user/reference/editReference'
import DeleteReference from '../../../components/user/reference/deleteReference'
import Router from 'next/router'

class reference {
  "id": string
  "title": string
  "description": string
  "location": string
  "englishLevel": string
}

const About: NextPage = () => {

  const [token, setToken] = useState<boolean>(false)
  const [about, setAbout] = useState({
    title: "",
    description: "",
    location: "",
    englishLevel: ""
  })

  useEffect(() => {
    axios("http://localhost:3002/auth/verify", {
        headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
    }).then(data => setToken(true))
        .catch(error => setToken(false))
    axios("http://localhost:3002/about")
        .then(data => setAbout(data.data))
        .catch(error => console.log(error))
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
        const editAbout: Object = await axios.put("http://localhost:3002/about",{
            title: about.title,
            description: about.description,
            location: about.location,
            englishLevel: about.englishLevel
        }, {
            headers: {"Authorization": `Bearer ${sessionStorage.getItem("Token")}`}
        })
        Router.push("/user")
    } catch (error) {
        console.log(error)
    }
  }

  const handleAbout = async (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setAbout({
        ...about,
        [event.target.name]: event.target.value
    })
  }

  return (
    <div className="bg-slate-900 h-screen">
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>
      {
        
        token ?
          <div className="flex flex-col h-full justify-around items-center py-4">
            <div className="cursor">
        <div className="cursor__inner"></div>
      </div>
            <Link href="/user" >
              <p className='bg-blue-900 transition-all p-4 rounded-xl text-white shadow-md shadow-white hover:bg-blue-600 hover:text-black hover:cursor-pointer'>
                /USER
              </p>
            </Link>
            <form className='flex flex-col w-4/5 items-center' onSubmit={e => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="TITLE"
                    name="title"
                    onChange={e => handleAbout(e)}
                    className="w-full text-center p-1 m-2 text-black"
                ></input>
                <textarea
                    placeholder="DESCRIPTION"
                    name="description"
                    onChange={e => handleAbout(e)}
                    className="w-full text-center p-1 m-2 text-black"
                ></textarea>
                <input
                    type="text"
                    placeholder="LOCATION"
                    name="location"
                    onChange={e => handleAbout(e)}
                    className="w-full text-center p-1 m-2 text-black"
                ></input>
                <input
                    type="text"
                    placeholder="ENGLISH LEVEL"
                    name="englishLevel"
                    onChange={e => handleAbout(e)}
                    className="w-full text-center p-1 m-2 text-black"
                ></input>
                <button type='submit' className="bg-red-400 w-1/2 transition-all rounded-lg p-2 m-8 hover:bg-white hover:text-black">Upload</button>
            </form>
            <ButtonLogout />
          </div> : <div>Not authorized</div>

      }

    </div>
  )
}

export default About