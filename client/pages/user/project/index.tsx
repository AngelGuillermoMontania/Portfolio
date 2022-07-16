import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MouseEvent, useEffect, useState } from 'react'
import axios from 'axios'

import ButtonLogout from '../../../components/user/ButtonLogout'


class projects {
    "id": string
    "name": string
    "image": string
    "level": string
}
class skills {
    "id": string
    "name": string
    "image": string
    "level": string
}
class tools {
    "id": string
    "name": string
    "image": string
    "level": string
}

const Project: NextPage = () => {

    const [allProjects, setAllProjects] = useState<Array<tools>>([])
    const [projectToEdit, setProjectToEdit] = useState<string>("")
    const [projectToDelete, setProjectToDelete] = useState<string>("")

    const [token, setToken] = useState<boolean>(false)

    useEffect(() => {
        const Token = sessionStorage.getItem("Token")
        if (Token) {
            setToken(!token)
        }
        axios("http://localhost:3001/project", {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(data => setAllProjects(data.data))
            .catch(error => console.log(error))
    }, [])

    const onDelete = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault()
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <div className="bg-slate-900 h-screen">
            {
                token ?
                    <div className="flex flex-col h-full justify-around items-center">
                        <Link href="/user" >
                            <p className='bg-blue-900 p-4 rounded-xl text-white shadow-md shadow-white hover:bg-blue-600 hover:text-black'>
                                /USER
                            </p>
                        </Link>
                        <div className='flex flex-col justify-around items-center'>
                            <Link href={`project/create`}>
                                <button className='bg-blue-600 p-4 rounded-xl'>
                                    Create
                                </button>
                            </Link>
                            <div className='h-24 flex items-center justify-around w-1/2'>
                                <select
                                    onChange={e => setProjectToEdit(e.target.value)}
                                >
                                    <option hidden>~</option>
                                    {
                                        allProjects.map(project => <option value={project.id} key={project.id}>{project.name}</option>)
                                    }
                                </select>
                                <Link href={`project/edit/${projectToEdit}`}>
                                    <button className='bg-blue-600 p-4 rounded-xl'>
                                        Edit
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <select
                                    onChange={e => setProjectToDelete(e.target.value)}
                                >
                                    <option hidden>~</option>
                                    {
                                        allProjects.map(project => <option value={project.id} key={project.id}>{project.name}</option>)
                                    }
                                </select>
                                <button className='bg-blue-600 p-4 rounded-xl' onClick={e => onDelete(e)}>
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