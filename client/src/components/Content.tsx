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
            {status === 'loading' ? <Loading /> : ''}
            {item ? (
                <>
                    <div>
                        {item.image ? (
                            <div className="w-full border-b-8 border-gray-200 rounded-sm">
                                <img
                                    className="object-cover h-full rounded-sm"
                                    src={item.image}
                                ></img>
                            </div>
                        ) : (
                            ''
                        )}
                        <h1 className="font-black text-black text-4xl p-8">
                            {item.title ? item.title : ''}
                        </h1>
                    </div>
                    <div className="bg-gray-100 w-full p-4 border">
                        <div className="py-12 px-6 bg-gray-50 border shadow-xl">
                            <div
                                className="prose-lg"
                                dangerouslySetInnerHTML={{
                                    __html: item.body,
                                }}
                            ></div>
                        </div>
                    </div>
                </>
            ) : (
                'no content'
            )}
        </div>
    )
}

export default Content
