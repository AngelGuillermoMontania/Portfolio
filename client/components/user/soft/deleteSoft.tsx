import Router from 'next/router'

import { FormEvent, useState } from 'react'
import axios from 'axios'
import { Soft } from '../../../interfaces'

class props {
    "token": string | null
    "allSofts": Array<Soft>
}

function DeleteSoft(props: props) {

    const [softSelect, setSoftSelect] = useState<string>("")
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_PORTFOLIO_API

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            await axios.delete(`/soft/image?id=${softSelect}`, {
                headers: { "Authorization": `Bearer ${props.token}` }
            })
            const postDataSoft = await axios.delete(`/soft?id=${softSelect}`, {
                headers: { "Authorization": `Bearer ${props.token}` }
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
                <select onChange={e => setSoftSelect(e.target.value)} className="w-1/3">
                    <option hidden>~</option>
                    {
                        props?.allSofts?.map(soft => <option value={soft.id} key={soft.id}>{soft.name}</option>)
                    }
                </select>
                <form onSubmit={e => onSubmit(e)} className="flex justify-around flex-wrap items-center">
                    <button type='submit' className="bg-red-400 rounded-lg p-2 hover:bg-white hover:text-black">Upload</button>
                </form>
            </div>
        </div>
    )
}

export default DeleteSoft