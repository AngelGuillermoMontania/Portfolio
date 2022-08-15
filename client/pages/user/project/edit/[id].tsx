import Router, { useRouter } from 'next/router'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { Skill, Tool } from '../../../../interfaces'

class props {
    "token": string | null
    "allTools": Array<Tool>
    "allSkills": Array<Skill>
}

function EditProject() {

    const router = useRouter()

    const [dataProject, setDataProject] = useState({
        name: "",
        description: "",
        dateInit: new Date(),
        dateEnd: new Date(),
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

    const [token, setToken] = useState<boolean>(false)

    useEffect(() => {
        const Token = sessionStorage.getItem("Token")
        if (Token) {
            setToken(!token)
        }
        axios("/tool", {
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then(data => setAllTools(data.data))
            .catch(error => console.log(error))
        axios("/skill", {
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then(data => setAllSkills(data.data))
            .catch(error => console.log(error))
        axios(`/project/one?id=${router.query.id}`, {
            headers: { "Authorization": `Bearer ${Token}` }
        })
            .then(data => {
                setDataProject(data.data)
                setSkillSelect(data.data.skills.map((elem: { id: string }) => elem.id))
                setToolSelect(data.data.tools.map((elem: { id: string }) => elem.id))
            })
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
        let postImage
        try {
            if (!imageProject) {
                const projectCreated = await axios(`/project/one?id=${router.query.id}`, {
                    headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
                })
                postImage = {
                    data: {
                        names: projectCreated.data.images
                    }
                }
            } else {
                await axios.delete(`/project/image?id=${router.query.id}`, {
                    headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
                })
                const formDataImage: FormData = new FormData()

                formDataImage.append("file", imageProject)

                postImage = await axios.post(`/project/image`, formDataImage, {
                    headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
                })
            }
            const namesImageS3: string = postImage.data.name
            const postDataSkill = await axios.put(`/project?id=${router.query.id}`, {
                name: dataProject.name,
                description: dataProject.description,
                dateInit: dataProject.dateInit,
                dateEnd: dataProject.dateEnd,
                repositoryLink: dataProject.repositoryLink,
                deployLink: dataProject.deployLink,
                relevance: Number(dataProject.relevance),
                company: dataProject.company,
                isActive: Boolean(dataProject.isActive),
                image: namesImageS3,
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
        <div className="bg-blue-800 flex flex-col items-center justify-center h-screen">
            <p className="text-white text-xl">EDIT SKILL:</p>
            <form onSubmit={e => onSubmit(e)} className="flex h-auto justify-around flex-wrap items-center text-black">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                    value={dataProject.name}
                ></input>
                <label htmlFor='dateInit'>Init Date</label>
                <input
                    type="date"
                    placeholder="dateInit"
                    name="dateInit"
                    id='dateInit'
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                    value={String(dataProject.dateInit).slice(0, 10)}
                ></input>
                <label htmlFor='dateEnd'>End Date</label>
                <input
                    type="date"
                    placeholder="dateEnd"
                    name="dateEnd"
                    id='dateEnd'
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                    value={String(dataProject.dateEnd).slice(0, 10)}
                ></input>
                <input
                    type="url"
                    placeholder="repositoryLink"
                    name="repositoryLink"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                    value={dataProject.repositoryLink}
                ></input>
                <input
                    type="url"
                    placeholder="deployLink"
                    name="deployLink"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                    value={dataProject.deployLink}
                ></input>
                <input
                    type="number"
                    placeholder="relevance, 0 to 3"
                    name="relevance"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                    value={dataProject.relevance}
                ></input>
                <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    onChange={e => handleProject(e)}
                    className="w-1/4 p-1 m-1"
                    value={dataProject.company}
                ></input>
                <div>
                    <label>Active?</label>
                    <select onChange={e => handleProject(e)} className="w-1/3 p-1 m-1" name='isActive'>
                        <option hidden>~</option>
                        <option value={"true"}>true</option>
                        <option value={"false"}>false</option>
                    </select>
                </div>
                <div>
                    <label>Skills</label>
                    <select
                        onChange={e => handleSkill(e)}
                        className="p-1 m-1"
                        name='skills'
                    >
                        <option hidden>~</option>
                        {
                            allSkills?.map(skill => <option key={skill.id} value={skill.id}>{skill.name}</option>)
                        }

                    </select>
                    {
                        allSkills.map(skill => {
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
                        className="p-1 m-1"
                        name='tools'
                    >
                        <option hidden>~</option>
                        {
                            allTools?.map(tool => <option key={tool.id} value={tool.id}>{tool.name}</option>)
                        }
                    </select>
                    {
                        allTools.map(tool => {
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
                    className="w-3/4 p-1 m-2 h-1/2"
                    value={dataProject.description}
                ></textarea>
                <div>
                    <label>Eliminara todas las imagenes ya cargadas en este proyecto</label>
                    <input
                        type="file"
                        name="file"
                        autoComplete="img"
                        onChange={e => handleImage(e)}
                        className="p-1 m-1"
                    ></input>
                </div>
                <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
            </form>
        </div>
    )
}

export default EditProject