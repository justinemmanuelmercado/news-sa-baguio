import React from 'react'
import { AlignJustify, Menu } from 'react-feather'

function OptionsMenu(): JSX.Element {
    const viewOptions = [
        {
            name: 'expanded',
            label: 'Expanded',
            Icon: Menu,
        },
        {
            name: 'compact',
            label: 'Compact',
            Icon: AlignJustify,
        },
    ]

    return (
        <div>
            <h2 className="font-bold uppercase">list view</h2>
            <span>
                <ul className="space-y-2 pt-4 pl-2">
                    {viewOptions.map((view) => {
                        return (
                            <li key={view.name}>
                                <label
                                    className="flex flex-row items-center space-x-1"
                                    htmlFor={view.name}
                                >
                                    <input
                                        type="radio"
                                        name="view"
                                        value={view.name}
                                        id={view.name}
                                    />
                                    <view.Icon size="1.3rem" />
                                    <span>{view.label}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </span>
        </div>
    )
}

export default OptionsMenu
