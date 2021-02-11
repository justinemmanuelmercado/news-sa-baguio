import React, { useState, useMemo } from 'react'
import { Article } from '../../redux/articles'
import truncate from 'lodash/truncate'
import { ExternalLink, Link } from 'react-feather'
import dayjs from 'dayjs'

type HandleArticleClick = (id: string) => void

const ArticleItem = ({
    article,
    handleArticleClick,
    selected,
}: {
    article: Article
    handleArticleClick: HandleArticleClick
    selected: boolean
}): JSX.Element => {
    const [imageDidLoad, setImageDidLoad] = useState<boolean>(false)
    const title = useMemo(() => {
        return truncate(article.title, { length: 110, separator: ' ', omission: '...' })
    }, [article.title])

    const createdAtString = useMemo(() => {
        return dayjs(article.createdAt).format('MMMM DD, YYYY')
    }, [article.createdAt])

    const handleOnload = () => {
        setImageDidLoad(true)
    }

    return (
        <div>
            <button
                onClick={() => handleArticleClick(article.id)}
                className={`bg-gray-100 odd:bg-gray-50 flex flex-row rounded-sm cursor-pointer text-left max-h-32 hover:text-green-100 border border-gray-300 w-full ${
                    selected ? 'shadow-inner' : 'shadow-lg'
                }`}
            >
                {article.image ? (
                    <div className="w-1/4 h-32 py-1 overflow-hidden rounded-sm">
                        <img
                            className={`object-cover h-full rounded-sm ${
                                imageDidLoad ? '' : 'hidden'
                            }`}
                            src={article.image}
                            onLoad={() => handleOnload()}
                        ></img>

                        <div
                            className={`bg-gray-200 w-full h-full flex items-center justify-center animate-pulse ${
                                imageDidLoad ? 'hidden' : ''
                            }`}
                        >
                            <div className="h-5 w-5 bg-gray-100 rounded-full" />
                            <div className="bg-white w-8 h-8 rounded-full"></div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <div
                    className={`h-32 pl-4 py-1 flex flex-col justify-between ${
                        article.image ? 'w-3/4' : ''
                    } ${selected ? 'border-r-4 border-green-100' : ''}`}
                >
                    <div>
                        <div className="space-x-4">
                            <span className="text-black">
                                {article.author ? article.author : article.newsSource.name}
                            </span>
                            <span className="font-light text-gray-600">{createdAtString}</span>
                        </div>
                        <h1 className="text-base font-bold">{title}</h1>
                    </div>
                    <div
                        onClick={(evt) => evt.stopPropagation()}
                        className="bg-gray-200 flex space-x-4 cursor-default px-2 h-8 self-end overflow-hidden"
                    >
                        <a
                            className="underline text-gray-700 flex items-center hover:text-green-100"
                            href={article.newsSource.homepage}
                        >
                            <ExternalLink className="mr-1" size="1rem" /> {article.newsSource.name}
                        </a>
                        <a
                            className="underline text-gray-700 flex items-center hover:text-green-100"
                            href={article.url}
                        >
                            <Link className="mr-1" size="1rem" /> Article page
                        </a>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default ArticleItem
