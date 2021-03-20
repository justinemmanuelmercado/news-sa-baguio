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
                className="flex flex-row rounded-sm text-base text-gray-700 bg-gray-50"
            >
                <input
                    className="p-2 rounded-l-sm text-base text-black w-4/5 bg-gray-100"
                    value={searchQuery}
                    onChange={handleChange}
                    type="text"
                    name="search"
                    id="search"
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="w-1/5 bg-gray-400 rounded-r-sm flex justify-center items-center"
                >
                    <Search size="1.2rem" />
                </button>
            </form>
        </>
    )
}

export default SearchMenu
