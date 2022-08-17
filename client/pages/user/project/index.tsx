import type { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'
import { Project } from '../../../interfaces'
import CreateProject from '../../../components/user/proyect/createProject'
import EditProject from '../../../components/user/proyect/editProject'

const Project: NextPage = () => {

    const [allProjects, setAllProjects] = useState<Array<Project>>([])   
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    const [token, setToken] = useState<boolean>(false)

    useEffect(() => {
        axios("/auth/verify", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => setToken(true))
            .catch(error => setToken(false))
        axios("/project", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => {
                if (data.data.status !== 200) {
                    setAllProjects(data.data)
                }
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="bg-slate-900 h-screen">
            {
                token ? <div className="flex flex-col h-full justify-around items-center">
                    <Link href="/user" >
                        <p className='bg-blue-900 p-4 rounded-xl text-white shadow-md shadow-white hover:bg-blue-600 hover:text-black'>
                            /USER
                        </p>
                    </Link>
                    <div className='flex flex-col justify-around items-center'>
                        <CreateProject token={sessionStorage.getItem("Token")}/>
                        <EditProject token={sessionStorage.getItem("Token")} allProjects={allProjects} />
                        <DeleteProject token={sessionStorage.getItem("Token")} allProjects={allProjects} />
                        
                    </div>
                    <ButtonLogout />
                </div> : <div>Not authorized</div>
            }
        </div>
    )
}

export default Project