import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

class props {
    "token": string | null
  }

function CreateReference (props: props) {

    const [dataReference, setDataReference] = useState<Object>({
        name: "",
        message: "",
    })
    const [imageReference, setImageReference] = useState<File>(new File([], "new"))

    const handleReference = (event: ChangeEvent<HTMLInputElement>): void => {
        setDataReference({
            ...dataReference,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        event.target.files && setImageReference(event.target.files[0])
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const formDataImage: FormData = new FormData()
            formDataImage.append("file", imageReference)
            const postImage: { "data": { "name": string } } = await axios.post(`http://localhost:3001/reference/image`, formDataImage, {
                headers: {"Authorization": `Bearer ${props.token}`}
            })
            const nameImageS3: string = postImage.data.name
            console.log(dataReference)
            console.log(nameImageS3)
            const postDataReference = await axios.post("http://localhost:3001/reference", {
                ...dataReference,
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
                <p className="text-white text-xl">CREATE TOOL:</p>
                <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={e => handleReference(e)}
                        className="w-1/4 p-1"
                    ></input>
                    <input
                        type="text"
                        placeholder="message"
                        name="message"
                        onChange={e => handleReference(e)}
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

export default CreateReference