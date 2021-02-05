import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function Loading(): JSX.Element {
    return <h1>Loading...</h1>
}

function Content(): JSX.Element {
    const { item, status } = useSelector((state: RootState) => state.content)
    return (
        <div className="h-screen overflow-y-auto">
            <div>
                {item.image ? (
                    <div className="w-full border-b-8 border-gray-200 rounded-sm">
                        <img className="object-cover h-full rounded-sm" src={item.image}></img>
                    </div>
                ) : (
                    ''
                )}
                <h1 className="font-black text-black text-4xl p-8">
                    {item.title ? item.title : ''}
                </h1>
            </div>
            <div className="bg-gray-100 w-full p-4">
                {status === 'loading' ? <Loading /> : ''}
                {item ? (
                    <div className="p-4 bg-gray-50 shadow-md">
                        <div
                            className="prose-lg"
                            dangerouslySetInnerHTML={{
                                __html: item.body,
                            }}
                        ></div>
                    </div>
                ) : (
                    <div>Content not yet available</div>
                )}
            </div>
        </div>
    )
}

export default Content
