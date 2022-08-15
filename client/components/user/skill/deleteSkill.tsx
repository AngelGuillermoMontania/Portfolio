import Router from 'next/router'

import { FormEvent, useState } from 'react'
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



function DeleteSkill (props: props) {

    const [skillSelect, setSkillSelect] = useState<string>("")

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
         
            await axios.delete(`/skill/image?id=${skillSelect}`, {
                headers: {"Authorization": `Bearer ${props.token}`}
            })
            const deleteSkill = await axios.delete(`/skill?id=${skillSelect}`,{
                headers: {"Authorization": `Bearer ${props.token}`}
            })
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    return (
      
            <div className="h-1/3 flex flex-col items-center justify-center">
                <p className="text-white text-xl">DELETE SKILL:</p>
                <div className='flex w-4/5 justify-around'>
                    <select onChange={e => setSkillSelect(e.target.value)} className="w-1/3">
                        <option hidden>~</option>
                        {
                            props?.allSkills?.map(skill => <option value={skill.id} key={skill.id}>{skill.name}</option>)
                        }
                    </select>
                    <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                        <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
                    </form>
                </div>
            </div>
    )


}

export default DeleteSkill