import React from 'react'
import { ChevronsDown, ChevronsUp, IconProps } from 'react-feather'

function MenuLayout({
    children,
    toggleExpand,
    isActive,
    icon: Icon,
    name,
}: {
    children: React.ReactNode
    toggleExpand: (name: string) => void
    isActive: boolean
    icon: React.FC<IconProps>
    name: string
}): JSX.Element {
    return (
        <React.Fragment>
            <button
                aria-label={`Open ${name} tab`}
                className="pl-4 py-2 bg-gray-50 border-b border-gray-300 focus:outline-black"
                onClick={() => {
                    toggleExpand(name)
                }}
            >
                <span className="flex flex-row space-x-2 py-2 font-bold text-md items-center">
                    <Icon size="1.2rem" /> <span>{name}</span>
                    {isActive ? <ChevronsUp /> : <ChevronsDown />}
                </span>
            </button>
            <div
                className={`${
                    isActive ? 'max-h-full' : 'max-h-0'
                } transition-max-height overflow-hidden`}
            >
                <div className="py-8 px-6 text-base space-y-4 bg-gray-100 shadow-inner border-b border-gray-300">
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default MenuLayout
