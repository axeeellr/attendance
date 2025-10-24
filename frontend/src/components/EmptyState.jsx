import React from 'react'

export default function EmptyState({ title, subtitle }){
    return (
        <div className="border rounded-2xl bg-white p-6 text-center text-gray-600">
            <p className="font-medium">{title}</p>
            <p className="text-sm mt-1">{subtitle}</p>
        </div>
    )
}