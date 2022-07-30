import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

class softs {
    "id": string
    "name": string
    "image": string
  }

class props {
    "token": string | null
    "allSofts": Array<softs>
  }

function EditSoft (props: props) {

    const [dataSoft, setDataSoft] = useState<Object>({
        name: "",
    })
    const [softSelect, setSoftSelect] = useState<string>("")
    
    const [imageSoft, setImageSoft] = useState<File>(new File([], "new"))

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
        let postImage
        try {
            if(imageSoft.size === 0) {
                postImage = {
                    data: props.allSofts.find(elem => elem.id === softSelect)
                }
            } else {
                await axios.delete(`http://localhost:3002/soft/image?id=${props.allSofts.find(elem => elem.id === softSelect)?.id}`, {
                    headers: {"Authorization": `Bearer ${props.token}`}
                })
                const formDataImage: FormData = new FormData()
                formDataImage.append("file", imageSoft)
                postImage = await axios.post(`http://localhost:3002/soft/image`, formDataImage, {
                    headers: {"Authorization": `Bearer ${props.token}`}
                })
            }
            const nameImageS3: string = postImage.data.image || postImage.data.name
            const postDataSoft = await axios.put(`http://localhost:3002/soft?id=${props.allSofts.find(elem => elem.id === softSelect)?.id}`, {
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
            <p className="text-white text-xl">EDIT TOOL:</p>
            <select onChange={e => setSoftSelect(e.target.value)} className="w-1/3 p-1 m-1">
                <option hidden>~</option>
                {
                    props?.allSofts?.map(soft => <option value={soft.id} key={soft.id}>{soft.name}</option>)
                }
            </select>
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

export default EditSoft