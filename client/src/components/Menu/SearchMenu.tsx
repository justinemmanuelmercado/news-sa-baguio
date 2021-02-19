import React, { useState } from 'react'
import { Search } from 'react-feather'
import { Filters } from '../../App'

function SearchMenu({
    filters,
    setFilters,
}: {
    filters: Filters
    setFilters: (f: Filters) => void
}): JSX.Element {
    const { search } = filters
    const [searchQuery, setSearchQuery] = useState<string>(search)

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setSearchQuery(evt.currentTarget.value)
    }

    const handleSearch = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        setFilters({ ...filters, search: searchQuery })
    }

    return (
        <>
            <form
                onSubmit={handleSearch}
                className="flex flex-row rounded-sm text-base text-gray-700 border border-gray-300 bg-gray-50"
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
                    aria-label="Search"
                    className="w-1/5 bg-gray-400 h-12 rounded-r-sm flex justify-center items-center"
                >
                    <Search size="1.2rem" />
                </button>
            </form>
        </>
    )
}

export default SearchMenu
