import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

class skills {
    "id": string
    "name": string
    "image": string
    "level": string
  }

class props {
    "token": string | null
    "allSkills": Array<skills>
  }

function EditSkill (props: props) {

    const [dataSkill, setDataSkill] = useState<Object>({
        name: "",
        level: "",
    })
    const [skillSelect, setSkillSelect] = useState<string>("")
    
    const [imageSkill, setImageSkill] = useState<File>(new File([], "new"))

    const handleSkill = (event: ChangeEvent<HTMLInputElement>): void => {
        setDataSkill({
            ...dataSkill,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        event.target.files && setImageSkill(event.target.files[0])
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        let postImage
        try {
            if(imageSkill.size === 0) {
                postImage = {
                    data: props.allSkills.find(elem => elem.id === skillSelect)
                }
            } else {
                await axios.delete(`http://localhost:3001/skill/image?id=${props.allSkills.find(elem => elem.id === skillSelect)?.id}`, {
                    headers: {"Authorization": `Bearer ${props.token}`}
                })
                const formDataImage: FormData = new FormData()
                formDataImage.append("file", imageSkill)
                postImage = await axios.post(`http://localhost:3001/skill/image`, formDataImage, {
                    headers: {"Authorization": `Bearer ${props.token}`}
                })
            }
            const nameImageS3: string = postImage.data.image || postImage.data.name
            const postDataSkill = await axios.put(`http://localhost:3001/skill?id=${props.allSkills.find(elem => elem.id === skillSelect)?.id}`, {
                ...dataSkill,
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
                <select onChange={e => setSkillSelect(e.target.value)} className="w-1/3 p-1 m-1">
                    <option hidden>~</option>
                    {
                        props?.allSkills?.map(skill => <option value={skill.id}>{skill.name}</option>)
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
                        placeholder="Level de 0 a 10"
                        name="level"
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

export default EditSkill