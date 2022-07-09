import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

class reference {
    "id": string
    "name": string
    "message": string
    "image": string
  }

class props {
    "token": string | null
    "allReferences": Array<reference>
  }

function EditReference (props: props) {

    const [dataReference, setDataReference] = useState<Object>({
        name: "",
        message: "",
    })
    const [referenceSelect, setReferenceSelect] = useState<string>("")
    
    const [imageReference, setImageReference] = useState<File>(new File([], "new"))

    const handleSkill = (event: ChangeEvent<HTMLInputElement>): void => {
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
        let postImage
        try {
            if(imageReference.size === 0) {
                postImage = {
                    data: props.allReferences.find(elem => elem.id === referenceSelect)
                }
            } else {
                await axios.delete(`http://localhost:3001/reference/image?id=${props.allReferences.find(elem => elem.id === referenceSelect)?.id}`, {
                    headers: {"Authorization": `Bearer ${props.token}`}
                })
                const formDataImage: FormData = new FormData()
                formDataImage.append("file", imageReference)
                postImage = await axios.post(`http://localhost:3001/reference/image`, formDataImage, {
                    headers: {"Authorization": `Bearer ${props.token}`}
                })
            }
            const nameImageS3: string = postImage.data.image || postImage.data.name
            const postDataReference = await axios.put(`http://localhost:3001/reference?id=${props.allReferences.find(elem => elem.id === referenceSelect)?.id}`, {
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
                <p className="text-white text-xl">EDIT TOOL:</p>
                <select onChange={e => setReferenceSelect(e.target.value)} className="w-1/3 p-1 m-1">
                    <option hidden>~</option>
                    {
                        props?.allReferences?.map(reference => <option value={reference.id}>{reference.name}</option>)
                    }
                </select>
                <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={e => handleSkill(e)}
                        className="w-1/4 p-1"
                    ></input>
                    <input
                        type="text"
                        placeholder="message"
                        name="message"
                        onChange={e => handleSkill(e)}
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

export default EditReference