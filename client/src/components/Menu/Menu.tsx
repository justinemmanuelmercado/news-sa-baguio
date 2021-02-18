import React, { useState } from 'react'
import { Filter, IconProps, Search, ChevronsUp, ChevronsDown } from 'react-feather'
import FilterMenu from './FilterMenu'
import SearchMenu from './SearchMenu'
import xor from 'lodash/xor'
import { Filters } from '../../App'
import MenuLayout from './MenuLayout'

function Menu({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="h-full bg-gray-50 text-black flex flex-col shadow-2xl">
            <div className="flex flex-col justify-between flex-grow overflow-y-auto">
                <div className="flex flex-col">{children}</div>
            </div>
        </div>
    )
}

export default Menu
