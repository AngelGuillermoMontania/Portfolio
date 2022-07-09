import Router from 'next/router'

import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

class softs {
    "id": string
    "name": string
  }

class props {
    "token": string | null
    "allSofts": Array<softs>
  }

function EditSoft (props: props) {

    const [dataSoft, setDataSoft] = useState<Object>({
        name: ""
    })
    const [softSelect, setSoftSelect] = useState<string>("")

    const handleSoft = (event: ChangeEvent<HTMLInputElement>): void => {
        setDataSoft({
            ...dataSoft,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const postDataSoft = await axios.put(`http://localhost:3001/soft?id=${softSelect}`,
            dataSoft, {
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
                        props?.allSofts?.map(soft => <option value={soft.id}>{soft.name}</option>)
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
                    <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
                </form>
            </div>
    )


}

export default EditSoft