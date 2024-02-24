import { Skill } from "./skill"
import { Tool } from "./tool"

export interface Project {
    "id": string
    "name": string
    "description": string
    "dateInit": Date
    "dateEnd": Date
    "image": string
    "repositoryLink": string
    "deployLink": string
    "relevance": number
    "company": string
    "isActive": boolean
    "skills": Array<Skill>
    "tools": Array<Tool>
}