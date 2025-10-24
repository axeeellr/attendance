import React from 'react'
import { Link } from 'react-router-dom'


export default function Card({ title, description, to }){
    return (
        <Link to={to} className="block rounded-2xl border bg-white p-5 hover:shadow-md transition">
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </Link>
    )
}