import React from 'react'
import { Home, Filter, List, Settings, Columns, IconProps } from 'react-feather'

function MenuLink({
    name,
    Icon,
    isActive,
}: {
    name: string
    Icon: React.FC<IconProps>
    isActive: boolean
}): JSX.Element {
    return (
        <span
            className={`${
                isActive ? 'text-gray-100 font-black' : ''
            } flex flex-row space-x-2 cursor-pointer`}
        >
            <Icon /> <span>{name}</span>
        </span>
    )
}

function Menu(): JSX.Element {
    return (
        <div className="h-full bg-green-500 text-gray-100 space-y-8">
            <div className="bg-green-400 space-y-8 py-8 pl-6">
                <div className="text-6xl font-black">
                    <h1>Bageeow</h1>
                </div>
                <div className="space-x-4">
                    <button className="btn bg-blue-300 hover:bg-blue-200">Sign In</button>
                    <span>or</span>
                    <button className="btn bg-green-500 hover:bg-green-300">Sign Up</button>
                </div>
            </div>
            <div className="pl-6 text-gray-100">
                <div className="flex flex-col text-xl space-y-4">
                    <MenuLink Icon={Home} name="Home" isActive={true} />
                    <MenuLink Icon={Filter} name="Filter" isActive={false} />
                    <MenuLink Icon={List} name="Sort" isActive={false} />
                    <MenuLink Icon={Columns} name="Sources" isActive={false} />
                    <MenuLink Icon={Settings} name="Options" isActive={false} />
                </div>
            </div>
            <div className="pl-6 text-gray-100"></div>
        </div>
    )
}

export default Menu
