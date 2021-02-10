import React from 'react'
import { Search } from 'react-feather'

function SearchMenu(): JSX.Element {
    return (
        <>
            <form className="flex flex-row items-center justify-center focus-within:ring-2 focus-within:ring-blue-500 rounded-md">
                <input
                    className="p-4 rounded-l-md text-base text-black h-12 w-4/5"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Keywords"
                />
                <button
                    type="submit"
                    className="w-1/5 bg-gray-400 h-12 rounded-r-md flex justify-center items-center"
                >
                    <Search size="1.2rem" />
                </button>
            </form>
        </>
    )
}

export default SearchMenu
