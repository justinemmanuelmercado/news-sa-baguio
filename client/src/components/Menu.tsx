import React from 'react'
import { Filter, Settings, Columns, IconProps } from 'react-feather'

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
            } flex flex-row space-x-2 cursor-pointer pl-4 py-2`}
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
        <div className="h-full bg-green-500 text-white space-y-8 flex flex-col py-6 shadow-2xl">
            <div className="flex flex-col justify-between flex-grow border-b border-green-400">
                <div className="flex flex-col text-xl text-gray-200 space-y-2">
                    <MenuLink Icon={Filter} name="Filter" isActive={false} />
                    <MenuLink Icon={Columns} name="Sources" isActive={false} />
                    <MenuLink Icon={Settings} name="Options" isActive={false} />
                </div>
            </div>
            <div className="pl-4">
                <BottomLink name="Contact" />
                <BottomLink name="About" />
                <BottomLink name="Terms" />
            </div>
        </div>
    )
}

export default Menu
