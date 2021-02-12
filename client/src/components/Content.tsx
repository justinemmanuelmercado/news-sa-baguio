import React, { useMemo } from 'react'
import { ExternalLink, Link } from 'react-feather'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import dayjs from 'dayjs'
import truncate from 'lodash/truncate'

const BlankBar = () => <div className="h-4 bg-gray-200 rounded"></div>

function Blank({ isLoading }: { isLoading: boolean }): JSX.Element {
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
                        <BlankBar />
                        <BlankBar />
                        <BlankBar />
                        <BlankBar />
                    </div>
                    <div className="space-y-4">
                        <BlankBar />
                        <BlankBar />
                        <BlankBar />
                        <BlankBar />
                    </div>
                    <div className="space-y-4">
                        <BlankBar />
                        <BlankBar />
                        <BlankBar />
                        <BlankBar />
                    </div>
                    <div className="space-y-4">
                        <BlankBar />
                        <BlankBar />
                        <BlankBar />
                        <BlankBar />
                    </div>
                </div>
            </div>
        </article>
    )
}

function Content(): JSX.Element {
    const { item, status } = useSelector((state: RootState) => state.content)
    const createdAtString = useMemo(() => {
        if (!item?.createdAt) {
            return ''
        } else {
            return dayjs(item.createdAt).format('MMMM DD, YYYY')
        }
    }, [item])

    const articleUrl = useMemo(() => {
        if (!item?.url) {
            return ''
        } else {
            return truncate(item.url, { length: 50, omission: '...' })
        }
    }, [item])

    return (
        <div className="overflow-y-auto h-screen">
            {status === 'idle' && <Blank isLoading={false} />}
            {status === 'loading' && <Blank isLoading={true} />}
            {status === 'succeeded' && (
                <article>
                    <div>
                        {item.image ? (
                            <div className="w-full border-b-8 border-gray-200 rounded-sm h-96 overflow-hidden ">
                                <img
                                    className="object-top object-cover rounded-sm"
                                    src={item.image}
                                    alt={item.description}
                                ></img>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="p-8 flex flex-col justify-between space-y-2">
                            <div className="flex space-x-4 cursor-default">
                                <a
                                    className="underline text-gray-700 flex items-center hover:text-green-100"
                                    href={item.newsSource.homepage}
                                >
                                    <ExternalLink className="mr-1" size="1rem" />{' '}
                                    {item.newsSource.name}
                                </a>
                                <a
                                    className="underline text-gray-700 flex items-center hover:text-green-100"
                                    href={item.url}
                                >
                                    <Link className="mr-1" size="1rem" /> {articleUrl}
                                </a>
                                <span>{createdAtString}</span>
                            </div>
                            <h1 className="font-black text-black text-4xl">{item.title}</h1>
                        </div>
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
            )}
        </div>
    )
}

export default Content
