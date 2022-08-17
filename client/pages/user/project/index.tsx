import type { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'

import { useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'
import { Tool } from '../../../interfaces'
import CreateProject from '../../../components/user/proyect/createProject'

const Project: NextPage = () => {

    const [allProjects, setAllProjects] = useState<Array<Tool>>([])
    const [projectToEdit, setProjectToEdit] = useState<string>("")
    const [projectToDelete, setProjectToDelete] = useState<string>("")
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

    const onDelete = async () => {
        try {
            await axios.delete(`/project/image?id=${projectToDelete}`, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
            })
            const deleteSkill = await axios.delete(`/project?id=${projectToDelete}`, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
            })
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

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
                        <CreateProject />
                        <div className='h-24 flex items-center justify-around w-1/2 text-black'>
                            
                            <Link href={`project/edit/${projectToEdit}`}>
                                <button className='bg-blue-600 p-4 rounded-xl hover:bg-blue-200'>
                                    Edit
                                </button>
                            </Link>
                        </div>
                        <div className='text-black'>
                            <select
                                onChange={e => setProjectToDelete(e.target.value)}
                            >
                                <option hidden>~</option>
                                {
                                    allProjects[0] ?
                                        allProjects?.map(project => <option value={project.id} key={project.id}>{project.name}</option>)
                                        : ""
                                }
                            </select>
                            <button className='bg-blue-600 p-4 rounded-xl hover:bg-blue-200' onClick={e => onDelete()}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <ButtonLogout />
                </div> : <div>Not authorized</div>
            }
        </div>
    )
}

export default Project