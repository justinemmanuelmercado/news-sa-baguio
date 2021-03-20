import React, { useContext, useMemo } from 'react'
import { ChevronsLeft, ChevronsRight, ExternalLink, Link } from 'react-feather'
import dayjs from 'dayjs'
import truncate from 'lodash/truncate'
import { Content as ContentType } from '../redux/content'
import { CompactContentContext } from './AppBody'

const BlankBar = () => <div className="h-4 bg-gray-200 rounded"></div>

function Blank({ isLoading }: { isLoading: boolean }): JSX.Element {
    return (
        <article className={`${isLoading ? 'animate-pulse' : ''} `}>
            <div className="h-96 bg-gray-200"></div>
            <h1 className="font-black text-black text-4xl p-8">
                {isLoading ? 'Loading...' : 'Select an article to get started'}
            </h1>
            <div className="py-12 px-6 space-y-8">
                <div className="space-y-4">
                    <BlankBar />
                    <BlankBar />
                    <BlankBar />
                    <BlankBar />
                </div>
            </div>
        </article>
    )
}

function Content({ content, status }: { content: ContentType; status: string }): JSX.Element {
    const { compactContent, setCompactContent } = useContext(CompactContentContext)
    const createdAtString = useMemo(() => {
        if (!content?.createdAt) {
            return ''
        } else {
            return dayjs(content.createdAt).format('MMMM DD, YYYY')
        }
    }, [content])

    const handleToggleCompact = () => {
        setCompactContent(!compactContent)
    }

    const articleUrl = useMemo(() => {
        if (!content?.url) {
            return ''
        } else {
            return truncate(content.url, { length: 50, omission: '...' })
        }
    }, [content])

    return (
        <div>
            <button
                aria-label="hide or show content"
                onClick={handleToggleCompact}
                className="z-10 fixed p-3 rounded-full border border-gray-500 bg-gray-50 animate-none shadow-xl m-2 text-gray-500 flex items-center justify-center"
            >
                {compactContent ? <ChevronsLeft /> : <ChevronsRight />}
            </button>
            <div>
                {status === 'loading' && <Blank isLoading={true} />}
                {status === 'idle' && <Blank isLoading={false} />}
                {status === 'success' && (
                    <article className="w-full p-0 lg:p-4">
                        <div>
                            {content.image ? (
                                <div className="rounded-sm h-96 overflow-hidden ">
                                    <img
                                        className="w-full h-full object-cover rounded-sm"
                                        src={content.image}
                                        alt={content.description}
                                    ></img>
                                </div>
                            ) : (
                                <div className="h-96 bg-gray-200"></div>
                            )}
                            <div className="py-6 px-6 text-black space-y-4">
                                <div className="pt-6 flex flex-col justify-between space-y-4">
                                    <h1 className="font-black text-black text-4xl">
                                        {content.title}
                                    </h1>
                                    <div
                                        className={`flex flex-col space-y-4 space-x-0 ${
                                            compactContent
                                                ? 'lg:flex-col lg:space-y-4 lg:space-x-0'
                                                : 'lg:flex-row lg:space-y-0 lg:space-x-4'
                                        } cursor-default`}
                                    >
                                        <a
                                            className="underline text-gray-800 flex items-center hover:text-green-100"
                                            href={content.newsSource.homepage}
                                        >
                                            <ExternalLink className="mr-1" size="1rem" />{' '}
                                            {content.newsSource.name}
                                        </a>
                                        <a
                                            className="underline text-gray-800 flex items-center hover:text-green-100"
                                            href={content.url}
                                        >
                                            <Link className="mr-1" size="1rem" /> {articleUrl}
                                        </a>
                                        <span className="text-gray-900">{createdAtString}</span>
                                    </div>
                                </div>
                                <div
                                    className="prose-lg"
                                    dangerouslySetInnerHTML={{
                                        __html: content.body,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </article>
                )}
            </div>
        </div>
    )
}

export default Content
