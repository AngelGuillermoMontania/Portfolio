import Router from 'next/router'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

import { Skill, Tool } from '../../../interfaces'

function CreateProject() {

    const [dataProject, setDataProject] = useState({
        name: "",
        description: "",
        dateInit: new Date(),
        dateEnd: new Date(),
        durationDays: 0,
        repositoryLink: "",
        deployLink: "",
        relevance: 0,
        company: "",
        isActive: true,
    })

    const [allSkills, setAllSkills] = useState<Array<Skill>>([])
    const [allTools, setAllTools] = useState<Array<Tool>>([])
    const [imageProject, setImageProject] = useState<File>(new File([], "new"))
    const [toolSelect, setToolSelect] = useState<Array<string>>([])
    const [skillSelect, setSkillSelect] = useState<Array<string>>([])
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    const [token, setToken] = useState<boolean>(false)

    useEffect(() => {
        axios("/auth/verify", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => setToken(true))
            .catch(error => setToken(false))
        axios("/tool", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => setAllTools(data.data))
            .catch(error => console.log(error))
        axios("/skill", {
            headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
        })
            .then(data => setAllSkills(data.data))
            .catch(error => console.log(error))
    }, [])

    const handleProject = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>): void => {
        setDataProject({
            ...dataProject,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        event.target.files && setImageProject(event.target.files[0])
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
            if (imageProject) {

                formDataImage.append("file", imageProject)

            }
            const postImage: { "data": { "name": string[] } } = await axios.post(`/project/image`, formDataImage, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
            })
            const nameImageS3 = postImage.data.name
            console.log(nameImageS3)
            const postDataSkill = await axios.post("/project", {
                name: dataProject.name,
                description: dataProject.description,
                dateInit: dataProject.dateInit,
                dateEnd: dataProject.dateEnd,
                repositoryLink: dataProject.repositoryLink,
                deployLink: dataProject.deployLink ? dataProject.deployLink : null,
                relevance: Number(dataProject.relevance),
                company: dataProject.company,
                isActive: Boolean(dataProject.isActive),
                image: nameImageS3,
                tools: toolSelect,
                skills: skillSelect
            }, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
            })
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {
                token ? <div className="h-screen bg-blue-600  flex flex-col items-center justify-center">
                    <p className="text-white text-xl">CREATE SKILL:</p>
                    <form onSubmit={e => onSubmit(e)} className="flex h-auto justify-around flex-wrap items-center">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={e => handleProject(e)}
                            className="w-1/4 p-1 m-1 text-black"
                        ></input>
                        <label htmlFor='dateInit'>Init Date</label>
                        <input
                            type="date"
                            placeholder="dateInit"
                            name="dateInit"
                            id='dateInit'
                            onChange={e => handleProject(e)}
                            className="w-1/4 p-1 m-1 text-black"
                        ></input>
                        <label htmlFor='dateEnd'>End Date</label>
                        <input
                            type="date"
                            placeholder="dateEnd"
                            id='dateEnd'
                            name="dateEnd"
                            onChange={e => handleProject(e)}
                            className="w-1/4 p-1 m-1 text-black"
                        ></input>
                        <input
                            type="url"
                            placeholder="repositoryLink"
                            name="repositoryLink"
                            onChange={e => handleProject(e)}
                            className="w-1/4 p-1 m-1 text-black"
                        ></input>
                        <input
                            type="url"
                            placeholder="deployLink"
                            name="deployLink"
                            onChange={e => handleProject(e)}
                            className="w-1/4 p-1 m-1 text-black"
                        ></input>
                        <input
                            type="number"
                            placeholder="relevance, 0 to 3"
                            name="relevance"
                            onChange={e => handleProject(e)}
                            className="w-1/4 p-1 m-1 text-black"
                        ></input>
                        <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            onChange={e => handleProject(e)}
                            className="w-1/4 p-1 m-1 text-black"
                        ></input>
                        <label>Active</label>
                        <select onChange={e => handleProject(e)} className="w-1/3 p-1 m-1" name='isActive'>
                            <option hidden>~</option>
                            <option value={"true"}>true</option>
                            <option value={"false"}>false</option>
                        </select>
                        <div>
                            <label>Skills</label>
                            <select
                                onChange={e => handleSkill(e)}
                                className="p-1 m-1 text-black"
                                name='skills'
                            >
                                <option>~</option>
                                {
                                    allSkills?.map(skill => <option key={skill.id} value={skill.id}>{skill.name}</option>)
                                }
                            </select>
                            {
                                allSkills?.map(skill => {
                                    if (skillSelect.includes(skill.id)) {
                                        return <button className='p-1 m-1 bg-red-500 rounded-lg' onClick={e => setSkillSelect(skillSelect.filter(elem => elem !== skill.id))}>Eliminar {skill.name}</button>
                                    }
                                })
                            }
                        </div>
                        <div>
                            <label>Tools</label>
                            <select
                                onChange={e => handleTool(e)}
                                className="p-1 m-1 text-black"
                                name='tools'
                            >
                                <option>~</option>
                                {
                                    allTools?.map(tool => <option key={tool.id} value={tool.id}>{tool.name}</option>)
                                }
                            </select>
                            {
                                allTools?.map(tool => {
                                    if (toolSelect.includes(tool.id)) {
                                        return <button className='p-1 m-1 bg-red-500 rounded-lg' onClick={e => setToolSelect(toolSelect.filter(elem => elem !== tool.id))}>Eliminar {tool.name}</button>
                                    }
                                })
                            }
                        </div>
                        <textarea
                            placeholder="Description"
                            name="description"
                            onChange={e => handleProject(e)}
                            className="w-3/4 p-1 m-2 text-black"
                        ></textarea>
                        <input
                            type="file"
                            name="file"
                            autoComplete="img"
                            onChange={e => handleImage(e)}
                            className="w-1/4 p-1 m-1"
                        ></input>
                        <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
                    </form>
                </div> : <div>Not Authorized</div>
            }
        </div>
    )
}

export default CreateProject