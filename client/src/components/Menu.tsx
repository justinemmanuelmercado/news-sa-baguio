import React from 'react'

function Menu(): JSX.Element {
    return (
        <div className="h-full bg-gray-600 text-gray-100 space-y-8">
            <div className="bg-gray-500 space-y-8 py-8 pl-6">
                <div className="text-6xl font-black">
                    <h1>Bageeow</h1>
                </div>
                <div className="space-x-4">
                    <button className="py-2 px-8 bg-blue-100 rounded-lg font-bold">Sign In</button>
                    <button className="py-2 px-8 bg-green-500 rounded-lg font-bold">Sign Up</button>
                </div>
            </div>
            <div className="pl-6 text-gray-400">
                <div className="flex flex-col text-xl space-y-4">
                    <span className="text-gray-100">Home</span>
                    <span>Filter</span>
                    <span>Search</span>
                    <span>Sources</span>
                </div>
            </div>
        </div>
    )
}

export default Menu
