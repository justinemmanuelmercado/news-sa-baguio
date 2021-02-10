import React from 'react'
import { Filter, Settings, IconProps, ChevronDown, Search, ChevronsLeft } from 'react-feather'
import FilterMenu from './FilterMenu'
import SearchMenu from './SearchMenu'

function MenuLink({
    name,
    Icon,
}: {
    name: string
    Icon: React.FC<IconProps>
    isActive: boolean
}): JSX.Element {
    return (
        <span className="flex flex-row space-x-2 cursor-pointer py-2 font-bold text-lg items-center">
            <Icon /> <span>{name}</span>
            <ChevronDown />
        </span>
    )
}

function Menu(): JSX.Element {
    return (
        <div className="h-full bg-green-400 text-white space-y-8 flex flex-col shadow-2xl">
            <div className="flex flex-col justify-between flex-grow border-b border-green-400 mt-4">
                <div className="flex flex-col text-xl text-gray-50 space-y-2">
                    <div className="pl-4">
                        <MenuLink Icon={Filter} name="Filter" isActive={false} />
                    </div>
                    <FilterMenu />
                    <div className="pl-4">
                        <MenuLink Icon={Search} name="Search" isActive={false} />
                    </div>
                    <SearchMenu />
                    <div className="pl-4">
                        <MenuLink Icon={Settings} name="Options" isActive={false} />
                    </div>
                </div>
            </div>
            <button className="pl-4 flex flex-row items-center space-x-2 py-4 bg-green-200 justify-start hover:bg-green-300">
                <ChevronsLeft /> <span>Hide Menu</span>
            </button>
        </div>
    )
}

export default Menu
