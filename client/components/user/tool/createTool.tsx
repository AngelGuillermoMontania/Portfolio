import type { NextPage } from 'next'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'


const CreateTool: NextPage = () => {

    const router: NextRouter = useRouter()

    const [dataTool, setDataTool] = useState<Object>({
        name: "",
        nivel: "",
    })
    const [imageTool, setImageTool] = useState<File>(new File([], "new"))

    const handleTool = (event: ChangeEvent<HTMLInputElement>): void => {
        setDataTool({
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        event.target.files && setImageTool(event.target.files[0])
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const formDataImage: FormData = new FormData()
            formDataImage.append("file", imageTool)
            const postImage: { "data": { "name": string } } = await axios.post(`http://localhost:3001/tool/image`, formDataImage)
            const nameImageS3: string = postImage.data.name
            const postDataTool: Object = await axios.post("http://localhost:3001/tool", {
                ...dataTool,
                image: nameImageS3
            })
            router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    return (
      
            <div className="h-1/3 flex flex-col items-center justify-center">
                <Head>
                    <title>Angel Guillermo Montaña</title>
                </Head>
                <p className="text-white text-xl">CREATE TOOL:</p>
                <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={e => handleTool(e)}
                        className="w-1/4 p-1"
                    ></input>
                    <input
                        type="text"
                        placeholder="Level de 0 a 10"
                        name="level"
                        onChange={e => handleTool(e)}
                        className="w-1/4 p-1"
                    ></input>
                    <input
                        type="file"
                        name="file"
                        autoComplete="img"
                        onChange={e => handleImage(e)}
                        className="w-1/4 p-1"
                    ></input>
                    <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
                </form>
            </div>
    )


}

export default CreateTool