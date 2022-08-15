import { NextPage } from 'next'
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
        className="bg-yellow-900 p-4 m-8 rounded-xl text-white shadow-md shadow-white transition-all hover:bg-yellow-600 hover:text-black"
        >
        LogOut
      </button>
  )
}

export default ButtonLogout