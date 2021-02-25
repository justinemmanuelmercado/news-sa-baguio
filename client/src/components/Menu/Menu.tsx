import React from 'react'

function Menu({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="h-full bg-gray-800 border-r border-gray-700 text-black flex flex-col shadow-2xl">
            <div className="flex flex-col justify-between flex-grow">
                <div className="flex flex-col">{children}</div>
            </div>
        </div>
    )
}

export default Menu
