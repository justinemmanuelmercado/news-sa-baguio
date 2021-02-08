import React, { useEffect } from 'react'
import { fetchSources } from '../..//redux/filters'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
function FilterMenu(): JSX.Element {
    const { sources } = useSelector((state: RootState) => state.filters)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAll = async () => {
            await dispatch(fetchSources())
        }

        fetchAll()
    }, [])
    return (
        <div className="bg-green-500 shadow-inner py-2 px-3 text-base flex flex-col space-y-2">
            <span>
                <span className="text-lg font-bold">Sources</span>
                <ul className="pl-2 font-light pt-2">
                    {sources.map((source) => {
                        return <li key={source.id}>{source.name}</li>
                    })}
                </ul>
            </span>
            <span>
                <label htmlFor="before-date" className="text-lg font-bold">
                    Added before
                </label>
                <input
                    id="before-date"
                    className="py-1 pl-2 focus:border-green-100 w-full"
                    type="date"
                />
            </span>
            <span>
                <label htmlFor="after-date" className="text-lg font-bold">
                    Added after
                </label>
                <input
                    id="after-date"
                    className="py-1 pl-2 focus:border-green-100 w-full"
                    type="date"
                />
            </span>
        </div>
    )
}

export default FilterMenu
