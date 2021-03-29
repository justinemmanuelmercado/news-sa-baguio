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
                <span className="flex flex-row bg-gray-600 rounded-sm p-2 space-x-2 font-bold text-lg items-center text-white">
                    <Icon className="text-gray-300" size="1rem" /> <span>{name}</span>
                </span>
            </div>
            <div>
                <div className="rounded-sm bg-gray-700 py-8 px-4 text-base space-y-4 text-gray-50">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MenuLayout
