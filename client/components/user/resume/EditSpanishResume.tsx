import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

class props {
    "token": string | null
}

function EditSpanishResume(props: props) {

    const [resumeSpanish, setResumeSpanish] = useState<File>(new File([], "new"))
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        event.target.files && setResumeSpanish(event.target.files[0])
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            await axios.delete(`/resume?resume=Spanish`, {
                headers: { "Authorization": `Bearer ${props.token}` }
            })
            const formDataResume: FormData = new FormData()
            formDataResume.append("file", resumeSpanish)
            let postS3Resume = await axios.post(`/resume`, formDataResume, {
                headers: { "Authorization": `Bearer ${props.token}` }
            })
            const nameResumeS3: string = postS3Resume.data.image || postS3Resume.data.name
            const putResume = await axios.put(`/resume`, {
                "spanish": nameResumeS3,
                "english": ""
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
            <p className="text-white text-2xl">EDIT RESUME SPANISH:</p>
            <p className="text-red-500 text-md">WARNING THIS DELETE PREVIOUS RESUME</p>
            <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                <input
                    type="file"
                    name="file"
                    autoComplete="file"
                    onChange={e => handleImage(e)}
                    className="w-1/4 p-1"
                ></input>
                <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
            </form>
        </div>
    )
}

export default EditSpanishResume