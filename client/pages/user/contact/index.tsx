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
  "name": string
  "image": string
  "message": string
}

const Contact: NextPage = () => {

  const [token, setToken] = useState<boolean>(false)
  const [contact, setContact] = useState({
    linkedin: "",
    mobile: "",
    twitter: "",
    github: "",
    email: ""
  })

  useEffect(() => {
    axios("http://localhost:3002/auth/verify", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        }).then(data => setToken(true))
            .catch(error => setToken(false))
    axios("http://localhost:3002/contact").then(data => setContact(data.data))
            .catch(error => console.log(error))
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
        const editContact: Object = await axios.put("http://localhost:3002/contact",{
            linkedin: contact.linkedin,
            mobile: contact.mobile,
            twitter: contact.twitter,
            github: contact.github,
            email: contact.email,
        }, {
            headers: {"Authorization": `Bearer ${sessionStorage.getItem("Token")}`}
        })
        Router.push("/user")
    } catch (error) {
        console.log(error)
    }
  }

  const handleContact = async (event: ChangeEvent<HTMLInputElement>) => {
    setContact({
        ...contact,
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
            <Link href="/user" >
              <p className='bg-blue-900 transition-all p-4 rounded-xl text-white shadow-md shadow-white hover:bg-blue-600 hover:text-black hover:cursor-pointer'>
                /USER
              </p>
            </Link>
            <form className='flex flex-col w-4/5 items-center' onSubmit={e => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="LINKEDIN"
                    name="linkedin"
                    onChange={e => handleContact(e)}
                    className="w-full text-center p-1 m-2"
                    value={contact.linkedin}
                ></input>
                <input
                    type="text"
                    placeholder="MOBILE"
                    name="mobile"
                    onChange={e => handleContact(e)}
                    className="w-full text-center p-1 m-2"
                    value={contact.mobile}
                ></input>
                <input
                    type="text"
                    placeholder="TWITTER"
                    name="twitter"
                    onChange={e => handleContact(e)}
                    className="w-full text-center p-1 m-2"
                    value={contact.twitter}
                ></input>
                <input
                    type="text"
                    placeholder="GITHUB"
                    name="github"
                    onChange={e => handleContact(e)}
                    className="w-full text-center p-1 m-2"
                    value={contact.github}
                ></input>
                <input
                    type="text"
                    placeholder="EMAIL"
                    name="email"
                    onChange={e => handleContact(e)}
                    className="w-full text-center p-1 m-2"
                    value={contact.email}
                ></input>
                <button type='submit' className="bg-red-400 w-1/2 transition-all rounded-lg p-2 m-8 hover:bg-white hover:text-black">Upload</button>
            </form>
            <ButtonLogout />
          </div> : <div>Not authorized</div>

      }

    </div>
  )
}

export default Contact