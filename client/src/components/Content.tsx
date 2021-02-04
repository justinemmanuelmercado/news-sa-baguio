import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function Loading(): JSX.Element {
    return <h1>Loading...</h1>
}

function Content(): JSX.Element {
    const { item, status } = useSelector((state: RootState) => state.content)
    return (
        <div className="bg-gray-100 h-screen w-full p-4 overflow-y-auto">
            {status === 'loading' ? <Loading /> : ''}
            {item ? (
                <div className="p-4 bg-gray-50 shadow-md">
                    <h1 className="font-black text-blac text-4xl">{item.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: item.body,
                        }}
                    ></div>
                </div>
            ) : (
                <div>Content not yet available</div>
            )}
        </div>
    )
}

export default Content
