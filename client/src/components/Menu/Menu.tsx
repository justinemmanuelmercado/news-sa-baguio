import React, { useState } from 'react'
import {
    Filter,
    Settings,
    IconProps,
    Search,
    ChevronsLeft,
    ChevronsUp,
    ChevronsDown,
} from 'react-feather'
import FilterMenu from './FilterMenu'
import SearchMenu from './SearchMenu'
import xor from 'lodash/xor'
import OptionsMenu from './OptionsMenu'

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
        <span className="flex flex-row space-x-2 py-2 font-bold text-md items-center">
            <Icon size="1.2rem" /> <span>{name}</span>
            {isActive ? <ChevronsUp /> : <ChevronsDown />}
        </span>
    )
}

function Menu(): JSX.Element {
    const menus = [
        {
            name: 'Filter',
            MenuComponent: FilterMenu,
            Icon: Filter,
        },
        {
            name: 'Search',
            MenuComponent: SearchMenu,
            Icon: Search,
        },
        {
            name: 'Options',
            MenuComponent: OptionsMenu,
            Icon: Settings,
        },
    ]
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['Filter', 'Search', 'Options'])

    const toggleExpand = (name: string) => {
        const newExpanded = xor(expandedMenus, [name])
        setExpandedMenus(newExpanded)
    }

    return (
        <div className="h-screen bg-gray-50 text-black flex flex-col shadow-2xl">
            <div className="flex flex-col justify-between flex-grow overflow-y-auto">
                <div className="flex flex-col">
                    {menus.map(({ name, MenuComponent, Icon }) => {
                        const isActive = expandedMenus.indexOf(name) !== -1

                        return (
                            <React.Fragment key={name}>
                                <button
                                    className="pl-4 py-2 bg-gray-50 border-b border-gray-300"
                                    onClick={() => {
                                        toggleExpand(name)
                                    }}
                                >
                                    <MenuLink Icon={Icon} name={name} isActive={isActive} />
                                </button>
                                <div
                                    className={`${
                                        isActive ? 'max-h-full' : 'max-h-0'
                                    } transition-max-height overflow-hidden`}
                                >
                                    <div className="py-8 px-6 text-base space-y-4 bg-gray-100 shadow-inner border-b border-gray-300">
                                        <MenuComponent />
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
            <button className="pl-4 flex flex-row items-center space-x-2 py-4 bg-gray-200 justify-start hover:bg-gray-100 shadow-xl">
                <ChevronsLeft /> <span>Hide Menu</span>
            </button>
        </div>
    )
}

export default Menu
