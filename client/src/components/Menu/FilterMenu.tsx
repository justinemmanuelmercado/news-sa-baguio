import React, { useEffect } from 'react'
import { fetchSources } from '../../redux/filters'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
function FilterMenu(): JSX.Element {
    const { sources, hiddenSources } = useSelector((state: RootState) => state.filters)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAll = async () => {
            await dispatch(fetchSources())
        }

        fetchAll()
    }, [])
    return (
        <div className="bg-green-500 shadow-inner py-4 px-4 text-base flex flex-col space-y-2">
            <span>
                <span className="text-base font-bold">By articles&apos; source</span>
                <ul className="font-light pt-2 pl-2">
                    {sources.map((source) => {
                        return (
                            <li key={source.id}>
                                <input
                                    checked={!hiddenSources.includes(source.id)}
                                    className="cursor-pointer"
                                    type="checkbox"
                                    name={source.name}
                                    id={source.name}
                                />{' '}
                                <label className="cursor-pointer" htmlFor={source.name}>
                                    {source.name}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </span>
            <div>
                <span className="text-base font-bold">By date</span>
                <span className="flex flex-col pt-2 pl-2">
                    <span className="flex flex-col">
                        <label htmlFor="after-date">From:</label>
                        <input
                            id="after-date"
                            placeholder="dd/mm/yy"
                            className="mt-2 py-1 px-2 rounded-sm focus:ring-2 focus:ring-blue-100 text-base text-black"
                            type="date"
                        />
                    </span>
                    <span className="flex flex-col">
                        <label htmlFor="before-date">To:</label>
                        <input
                            id="before-date"
                            placeholder="dd/mm/yy"
                            className="mt-2 py-1 px-2 rounded-sm focus:ring-2 focus:ring-blue-100 text-base text-black"
                            type="date"
                        />
                    </span>
                </span>
            </div>
        </div>
    )
}

export default FilterMenu
