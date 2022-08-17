import axios from "axios"
import Router from "next/router"
import { useState } from "react"
import { Project } from "../../../interfaces"

class props {
    "token": string | null
    "allProjects": Array<Project>
}

function DeleteProject(props: props) {

    const [projectToDelete, setProjectToDelete] = useState<string>("")

    const onDelete = async () => {
        try {
            await axios.delete(`/project/image?id=${projectToDelete}`, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
            })
            const deleteSkill = await axios.delete(`/project?id=${projectToDelete}`, {
                headers: { "Authorization": `Bearer ${sessionStorage.getItem("Token")}` }
            })
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='text-black'>
            <select
                onChange={e => setProjectToDelete(e.target.value)}
            >
                <option hidden>~</option>
                {
                    props.allProjects[0] ?
                        props.allProjects?.map(project => <option value={project.id} key={project.id}>{project.name}</option>)
                        : ""
                }
            </select>
            <button className='bg-blue-600 p-4 rounded-xl hover:bg-blue-200' onClick={e => onDelete()}>
                Delete
            </button>
        </div>
    )
}