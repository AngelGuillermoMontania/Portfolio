import { NextPage } from 'next'
import Link from 'next/link'
import { Props } from 'next/script'
import React from 'react'

export class props {
  "title": string
  "href": string
}

function Button(props: props) {
  return (
    <Link href={props.href}>
      <button className="bg-blue-900 p-4 rounded-xl text-white shadow-md shadow-white hover:bg-blue-600 hover:text-black">
        <h2>{props.title}</h2>
      </button>
    </Link>
  )
}

export default Button