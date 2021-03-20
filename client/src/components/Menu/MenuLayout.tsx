import React from 'react'
import { IconProps } from 'react-feather'

function MenuLayout({
    children,
    icon: Icon,
    name,
}: {
    children: React.ReactNode
    icon: React.FC<IconProps>
    name: string
}): JSX.Element {
    return (
        <div>
            <div aria-label={`Open ${name} tab`} className="focus:outline-black">
                <span className="flex flex-row space-x-2 py-2 font-bold text-lg items-center text-white">
                    <Icon className="text-gray-300" size="1rem" /> <span>{name}</span>
                </span>
            </div>
            <div>
                <div className="text-base space-y-4 text-gray-50 px-6 py-2">{children}</div>
            </div>
        </div>
    )
}

export default MenuLayout
