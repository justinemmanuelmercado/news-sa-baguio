import React from 'react'
import { AlignJustify, Menu } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { setCompactMode } from '../../redux/options'
import { RootState } from '../../redux/store'

function OptionsMenu(): JSX.Element {
    const { compactMode } = useSelector((state: RootState) => state.options)
    const dispatch = useDispatch()
    const handleChange = (val: boolean) => {
        dispatch(setCompactMode({ compactMode: val }))
    }
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
                                        onChange={() => {
                                            handleChange(view.name === 'compact')
                                        }}
                                        name={view.name}
                                        checked={
                                            view.name === 'compact' ? compactMode : !compactMode
                                        }
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
