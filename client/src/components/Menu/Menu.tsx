import React from 'react'
import { Filter, Settings, Columns, IconProps } from 'react-feather'
import FilterMenu from './FilterMenu'

function MenuLink({
    name,
    Icon,
}: {
    name: string
    Icon: React.FC<IconProps>
    isActive: boolean
}): JSX.Element {
    return (
        <span className="flex flex-row space-x-2 cursor-pointer py-2 font-bold text-2xl items-center">
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
        <div className="h-full bg-green-400 text-white space-y-8 flex flex-col py-6 shadow-2xl">
            <div className="flex flex-col justify-between flex-grow border-b border-green-400">
                <div className="flex flex-col text-xl text-gray-50 space-y-2">
                    <div className="pl-4">
                        <MenuLink Icon={Filter} name="Filter" isActive={false} />
                    </div>
                    <FilterMenu />
                    <div className="pl-4">
                        <MenuLink Icon={Columns} name="Sources" isActive={false} />
                    </div>
                    <div className="pl-4">
                        <MenuLink Icon={Settings} name="Options" isActive={false} />
                    </div>
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
