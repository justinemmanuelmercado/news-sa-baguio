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
        <span className={`${isActive ? 'font-black' : ''} flex flex-row space-x-2 cursor-pointer`}>
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
        <div className="h-full bg-gray-400 text-gray-200 space-y-8 flex flex-col">
            <div className="bg-gray-500 space-y-8 py-8 pl-6">
                <div className="text-6xl font-black">
                    <h1>Logo</h1>
                </div>
                <div className="space-x-1">
                    <button className="btn bg-blue-200 hover:bg-blue-100">Sign In</button>
                    <button className="btn bg-blue-400 hover:bg-blue-300">Register</button>
                </div>
            </div>
            <div className="pl-6 text-gray-200 flex flex-col justify-between flex-grow">
                <div className="flex flex-col text-xl space-y-4">
                    <MenuLink Icon={Home} name="Home" isActive={true} />
                    <MenuLink Icon={Filter} name="Filter" isActive={false} />
                    <MenuLink Icon={List} name="Sort" isActive={false} />
                    <MenuLink Icon={Columns} name="Sources" isActive={false} />
                    <MenuLink Icon={Settings} name="Options" isActive={false} />
                </div>
            </div>
            <div className="text-gray-200 pl-6 pb-6">
                <BottomLink name="Contact" />
                <BottomLink name="About" />
                <BottomLink name="Terms & Conditions" />
            </div>
        </div>
    )
}

export default Menu
