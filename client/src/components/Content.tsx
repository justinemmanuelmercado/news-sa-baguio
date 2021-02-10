import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function Loading({ isLoading }: { isLoading: boolean }): JSX.Element {
    return (
        <article className={`${isLoading ? 'animate-pulse' : ''} `}>
            <div>
                <div className="h-96 bg-gray-200"></div>
                <h1 className="font-black text-black text-4xl p-8">
                    {isLoading ? 'Loading...' : 'Select an article to get started'}
                </h1>
            </div>
            <div className="w-full p-4 border bg-gray-100">
                <div className="py-12 px-6 bg-gray-50 border shadow-xl space-y-8">
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </article>
    )
}

function Content(): JSX.Element {
    const { item, status } = useSelector((state: RootState) => state.content)
    return (
        <div className="overflow-y-auto h-screen">
            {status === 'loading' ? <Loading isLoading={true} /> : ''}
            {item ? (
                <article>
                    <div>
                        {item.image ? (
                            <div className="w-full border-b-8 border-gray-200 rounded-sm h-96 overflow-hidden ">
                                <img
                                    className="object-top object-cover rounded-sm"
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
                </article>
            ) : (
                <Loading isLoading={false} />
            )}
        </div>
    )
}

export default Content
