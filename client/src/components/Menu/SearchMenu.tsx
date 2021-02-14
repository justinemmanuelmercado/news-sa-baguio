import React, { useState } from 'react'
import { Search } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { updateFilters } from '../../redux/filters'
import { RootState } from '../../redux/store'

function SearchMenu(): JSX.Element {
    const dispatch = useDispatch()
    const {
        actualFilters: { search },
    } = useSelector((state: RootState) => state.filters)
    const [searchQuery, setSearchQuery] = useState<string>(search)

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setSearchQuery(evt.currentTarget.value)
    }

    const handleSearch = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        dispatch(updateFilters({ search: searchQuery }))
    }

    return (
        <>
            <form
                onSubmit={handleSearch}
                className="flex flex-row rounded-sm focus-within:ring-2 focus-within:ring-blue-500 text-base text-gray-700 ring-1 ring-gray-300 bg-gray-50"
            >
                <input
                    className="p-4 rounded-l-sm text-base text-black h-12 w-4/5"
                    value={searchQuery}
                    onChange={handleChange}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Keywords"
                />
                <button
                    type="submit"
                    className="w-1/5 bg-gray-400 h-12 rounded-r-sm flex justify-center items-center"
                >
                    <Search size="1.2rem" />
                </button>
            </form>
        </>
    )
}

export default SearchMenu
