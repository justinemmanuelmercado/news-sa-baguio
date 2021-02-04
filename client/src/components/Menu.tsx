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
                isActive ? 'font-black text-white' : ''
            } flex flex-row space-x-2 cursor-pointer`}
        >
            <Icon /> <span>{name}</span>
        </span>
    )
}

function BottomLink({ name }: { name: string }) {
    return (
        <span className={`flex flex-row space-x-2 cursor-pointer`}>
            <span>{name}</span>
        </span>
    )
}

function Menu(): JSX.Element {
    return (
        <div className="h-full bg-green-200 text-white space-y-8 flex flex-col">
            <div className="space-y-8 py-8 border-b border-green-300">
                <div className="text-6xl font-black px-4">
                    <h1>BC</h1>
                </div>
                <div className="space-y-1 px-4">
                    <button className="btn bg-blue-300 hover:shadow-sm w-full">Sign In</button>
                    <button className="btn bg-blue-200 hover:shadow-sm  w-full">Register</button>
                </div>
            </div>
            <div className="pl-6 flex flex-col justify-between flex-grow border-b border-green-400">
                <div className="flex flex-col text-xl text-gray-200 space-y-2">
                    <MenuLink Icon={Home} name="Home" isActive={true} />
                    <MenuLink Icon={Filter} name="Filter" isActive={false} />
                    <MenuLink Icon={List} name="Sort" isActive={false} />
                    <MenuLink Icon={Columns} name="Sources" isActive={false} />
                    <MenuLink Icon={Settings} name="Options" isActive={false} />
                </div>
            </div>
            <div className="pl-6 pb-6">
                <BottomLink name="Contact" />
                <BottomLink name="About" />
                <BottomLink name="Terms" />
            </div>
        </div>
    )
}

export default Menu
