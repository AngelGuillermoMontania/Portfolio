import { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'

import React from 'react'

const ButtonLogout: NextPage = () => {

    const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        sessionStorage.clear()
        Router.push("/user/login")
    }

  return (
      <button 
      onClick={e => logOut(e)}
        className="bg-blue-900 p-4 rounded-xl text-white shadow-md shadow-white hover:bg-blue-600 hover:text-black"
        >
        LogOut
      </button>
  )
}

export default ButtonLogout