import React from 'react'
import { Search } from 'react-feather'

function SearchMenu(): JSX.Element {
    return (
        <div className="bg-green-500 shadow-inner py-4 px-4 text-base space-y-2">
            <form className="flex flex-row items-center justify-center focus:border-4 focus:border-blue-100 pl-2">
                <input
                    className="p-2 rounded-l-md text-base text-black h-12 w-4/5"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Keywords"
                />
                <button
                    type="submit"
                    className="w-1/5 bg-gray-500 h-12 rounded-r-md flex justify-center items-center"
                >
                    <Search size="1.2rem" />
                </button>
            </form>
        </div>
    )
}

export default SearchMenu
