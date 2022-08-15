import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

class tools {
    "id": string
    "name": string
    "image": string
    "level": string
  }

class props {
    "token": string | null
    "allTools": Array<tools>
  }

function DeleteTool (props: props) {

    const [toolSelect, setToolSelect] = useState<string>("")

    console.log(toolSelect)

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
         
            await axios.delete(`/tool/image?id=${toolSelect}`, {
                headers: {"Authorization": `Bearer ${props.token}`}
            })
            const postDataTool = await axios.delete(`/tool?id=${toolSelect}`,{
                headers: {"Authorization": `Bearer ${props.token}`}
            })
            Router.push("/user")
        } catch (error) {
            console.log(error)
        }
    }

    return (
      
            <div className="h-1/3 flex flex-col items-center justify-center">
                <p className="text-white text-xl">DELETE TOOL:</p>
                <div className='flex w-4/5 justify-around'>
                    <select onChange={e => setToolSelect(e.target.value)} className="w-1/3">
                        <option hidden>~</option>
                        {
                            props?.allTools?.map(tool => <option value={tool.id} key={tool.id}>{tool.name}</option>)
                        }
                    </select>
                    <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                        <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
                    </form>
                </div>
            </div>
    )


}

export default DeleteTool