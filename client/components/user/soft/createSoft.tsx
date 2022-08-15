import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

class props {
    "token": string | null
}

function CreateSoft (props: props) {

    const [dataSoft, setDataSoft] = useState<Object>({
        name: ""
    })
    const [imageSoft, setImageSoft] = useState<File>(new File([], "new"))
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    const handleSoft = (event: ChangeEvent<HTMLInputElement>): void => {
        setDataSoft({
            ...dataSoft,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        event.target.files && setImageSoft(event.target.files[0])
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const formDataImage: FormData = new FormData()
            formDataImage.append("file", imageSoft)
            const postImage: { "data": { "name": string } } = await axios.post(`/soft/image`, formDataImage, {
                headers: {"Authorization": `Bearer ${props.token}`}
            })
            const nameImageS3: string = postImage.data.name
            const postDataSoft: Object = await axios.post("/soft", {
                ...dataSoft,
                image: nameImageS3
            }, {
                headers: {"Authorization": `Bearer ${props.token}`}
            })
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-1/3 flex flex-col items-center justify-center">
            <p className="text-white text-xl">CREATE SOFT:</p>
            <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={e => handleSoft(e)}
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

export default CreateSoft