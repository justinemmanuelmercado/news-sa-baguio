import React from 'react'

function Menu({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="h-full text-black flex flex-col p-4">
            <div className="flex flex-col justify-between flex-grow">
                <div className="flex flex-col space-y-8">{children}</div>
            </div>
        </div>
    )
}

export default Menu
