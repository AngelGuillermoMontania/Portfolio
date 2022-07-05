import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

const Tool: NextPage = () => {

    const router = useRouter()

    const [tool, setTool] = useState({
        name: "",
        nivel: "",
    })
    const [image, setImage] = useState<any>()
    const [user, setUser] = useState<any>([])

    const handleTool = (event: ChangeEvent<HTMLInputElement>) => {
        setTool({
            ...tool,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setImage({
            ...image,
            file: event.target.files
        })
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(image.file[0])
        try {
            const formDataImage = new FormData()
            formDataImage.append("file", image.file[0])
            console.log(formDataImage)
            const postImage = await axios.post(`http://localhost:3001/tool/image`, formDataImage)
            const nameImageS3 = postImage.data.name
            const postDataTool = await axios.post("http://localhost:3001/tool", {
                ...tool,
                image: nameImageS3
            })
            router.push("/user")
        } catch (error) {
            console.log("Error de front")
        }
    }

    const getUsers = async () => {
        try {
            let allUser = await axios.get("http://localhost:3001/user?email=angelguillermomontania@gmail.com", {
                headers: {'Access-Control-Allow-Origin': '*'}
            })
            setUser(allUser.data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>
      <form onSubmit={e => onSubmit(e)}>
        <input 
            type={"text"} 
            placeholder={"name"} 
            name="name"
            onChange={e => handleTool(e)}
        ></input>
        <input 
            type={"text"} 
            placeholder={"nivel de 0 a 10"} 
            
            name="nivel"
            onChange={e => handleTool(e)}    
        ></input>
        <input 
            type="file" 
            name="file"
            autoComplete="img"
            onChange={e => {
                console.log(e)
                handleImage(e)
            }}    
        ></input>
        <button type='submit'>Subir</button>
      </form>

      <button onClick={() => getUsers()}>GET USERS</button>
      {
        user ? user.map((elem: Object) => <p>{elem.email}</p>) : ""
      }
    </div>
  )
}

export default Tool