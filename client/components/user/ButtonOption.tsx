import Link from 'next/link'
import React from 'react'

export class props {
  "title": string
  "href": string
}

function ButtonOption(props: props) {
  return (
    <Link href={props.href} >

      <p className="bg-blue-900 w-1/5 h-full p-4 rounded-xl transition-all text-white shadow-md shadow-white text-center hover:bg-blue-600 hover:text-black hover:cursor-pointer">
        {props.title}
      </p>

    </Link>
  )
}

export default ButtonOption