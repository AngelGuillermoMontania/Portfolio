import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import { Tool } from '../../../interfaces'

class props {
    "token": string | null
    "allTools": Array<Tool>
}

function EditTool(props: props) {

    const [dataTool, setDataTool] = useState<Object>({
        name: "",
        level: "",
    })
    const [toolSelect, setToolSelect] = useState<string>("")
    const [imageTool, setImageTool] = useState<File>(new File([], "new"))
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    const handleTool = (event: ChangeEvent<HTMLInputElement>): void => {
        setDataTool({
            ...dataTool,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        event.target.files && setImageTool(event.target.files[0])
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        let postImage
        try {
            if (imageTool.size === 0) {
                postImage = {
                    data: props.allTools.find(elem => elem.id === toolSelect)
                }
            } else {
                await axios.delete(`/tool/image?id=${props.allTools.find(elem => elem.id === toolSelect)?.id}`, {
                    headers: { "Authorization": `Bearer ${props.token}` }
                })
                const formDataImage: FormData = new FormData()
                formDataImage.append("file", imageTool)
                postImage = await axios.post(`/tool/image`, formDataImage, {
                    headers: { "Authorization": `Bearer ${props.token}` }
                })
            }
            const nameImageS3: string = postImage.data.image || postImage.data.name
            const postDataTool = await axios.put(`/tool?id=${props.allTools.find(elem => elem.id === toolSelect)?.id}`, {
                ...dataTool,
                image: nameImageS3
            }, {
                headers: { "Authorization": `Bearer ${props.token}` }
            })
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-1/3 flex flex-col items-center justify-center">
            <p className="text-white text-xl">EDIT TOOL:</p>
            <select onChange={e => setToolSelect(e.target.value)} className="w-1/3 p-1 m-1">
                <option hidden>~</option>
                {
                    props?.allTools?.map(tool => <option value={tool.id} key={tool.id}>{tool.name}</option>)
                }
            </select>
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

export default EditTool