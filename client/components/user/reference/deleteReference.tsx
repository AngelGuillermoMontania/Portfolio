import Router from 'next/router'

import { FormEvent, useState } from 'react'
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



function DeleteReference (props: props) {

    const [referenceSelect, setReferenceSelect] = useState<string>("")

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            await axios.delete(`http://localhost:3001/reference/image?id=${referenceSelect}`, {
                headers: {"Authorization": `Bearer ${props.token}`}
            })
            const deleteReference = await axios.delete(`http://localhost:3001/reference?id=${referenceSelect}`,{
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
                    <select onChange={e => setReferenceSelect(e.target.value)} className="w-1/3">
                        <option hidden>~</option>
                        {
                            props?.allReferences?.map(reference => <option value={reference.id}>{reference.name}</option>)
                        }
                    </select>
                    <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                        <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
                    </form>
                </div>
            </div>
    )


}

export default DeleteReference