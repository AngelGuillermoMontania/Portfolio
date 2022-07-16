import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import Error from 'next/error'

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

class props {
    "token": string | null
    "allTools": Array<tools>
    "allSkills": Array<skills>
}

function EditProject(props: props) {

    const [dataProject, setDataProject] = useState({
        name: "",
        description: "",
        init: new Date(),
        durationDays: 0,
        repositoryLink: "",
        deployLink: "",
        relevance: 0,
        company: "",
        isActive: true,
    })

    const [imagesProject, setImagesProject] = useState<FileList>()
    const [toolSelect, setToolSelect] = useState<Array<string>>([])
    const [skillSelect, setSkillSelect] = useState<Array<string>>([])

    const handleProject = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>): void => {
        setDataProject({
            ...dataProject,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        event.target.files && setImagesProject(event.target.files)
    }

    const handleSkill = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSkillSelect([
            ...skillSelect,
            event.target.value
        ])
    }

    const handleTool = (event: ChangeEvent<HTMLSelectElement>): void => {
        setToolSelect([
            ...toolSelect,
            event.target.value
        ])
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const formDataImage: FormData = new FormData()
            if (imagesProject) {
                for (let i = 0; i < imagesProject.length; i++) {
                    formDataImage.append("files", imagesProject[0])
                }
            }
            const postImage: { "data": { "names": string[] } } = await axios.post(`http://localhost:3001/project/image`, formDataImage, {
                headers: { "Authorization": `Bearer ${props.token}` }
            })
            const namesImageS3 = postImage.data.names
            const postDataSkill = await axios.post("http://localhost:3001/project", {
                name: dataProject.name,
                description: dataProject.description,
                init: dataProject.init,
                durationDays: Number(dataProject.durationDays),
                repositoryLink: dataProject.repositoryLink,
                deployLink: dataProject.deployLink,
                relevance: Number(dataProject.relevance),
                company: dataProject.company,
                isActive: Boolean(dataProject.isActive),
                images: namesImageS3,
                tools: toolSelect,
                skills: skillSelect
            }, {
                headers: { "Authorization": `Bearer ${props.token}` }
            })
            console.log(postDataSkill)
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="h-60 my-24 flex flex-col items-center justify-center">
            <p className="text-white text-xl">CREATE SKILL:</p>
            <form onSubmit={e => onSubmit(e)} className="flex h-auto justify-around flex-wrap items-center">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                ></input>
                <input
                    type="date"
                    placeholder="Init"
                    name="init"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                ></input>
                <input
                    type="number"
                    placeholder="durationDays"
                    name="durationDays"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                ></input>
                <input
                    type="url"
                    placeholder="repositoryLink"
                    name="repositoryLink"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                ></input>
                <input
                    type="url"
                    placeholder="deployLink"
                    name="deployLink"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                ></input>
                <input
                    type="number"
                    placeholder="relevance, 0 to 3"
                    name="relevance"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                ></input>
                <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                ></input>
                <select onChange={e => handleProject(e)} className="w-1/3 p-1 m-1" name='isActive'>
                    <option hidden>~</option>
                    <option value={"true"}>true</option>
                    <option value={"false"}>false</option>
                </select>
                <select
                    onChange={e => handleSkill(e)}
                    className="w-1/3 p-1 m-1"
                    name='skills'
                >
                    <option hidden>~</option>
                    {
                        props?.allSkills?.map(skill => <option key={skill.id} value={skill.id}>{skill.name}</option>)
                    }
                </select>
                <select
                    onChange={e => handleTool(e)}
                    className="w-1/3 p-1 m-1"
                    name='tools'
                >
                    <option hidden>~</option>
                    {
                        props?.allTools?.map(tool => <option key={tool.id} value={tool.id}>{tool.name}</option>)
                    }
                </select>
                <textarea
                    placeholder="Description"
                    name="description"
                    onChange={e => handleProject(e)}
                    className="w-3/4 p-1 m-2 h-1/2"
                ></textarea>
                <input
                    type="file"
                    name="file"
                    autoComplete="img"
                    onChange={e => handleImage(e)}
                    multiple
                    className="w-1/4 p-1 m-1"
                ></input>
                <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
            </form>
        </div>
    )
}

export default EditProject