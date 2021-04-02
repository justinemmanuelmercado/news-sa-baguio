import React, { useState, useMemo } from 'react'
import { Article } from '../../redux/articles'
import truncate from 'lodash/truncate'
import { ExternalLink, Link } from 'react-feather'
import dayjs from 'dayjs'
import CustomLink from '../CustomLink'
import { LoadingImage } from './ArticlesList'

type HandleArticleClick = (id: string) => void

const ArticleItem = ({
    article,
    handleArticleClick,
    selected,
    compactContent,
}: {
    article: Article
    handleArticleClick: HandleArticleClick
    selected: boolean
    compactContent: boolean
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
        <button
            aria-label={`Read article: ${article.title}`}
            onClick={() => handleArticleClick(article.id)}
            className={`${
                selected ? 'border-r-4 border-green-100' : ''
            } focus:outline-black bg-gray-700 hover:text-green-100 text-gray-50 flex flex-row rounded-sm cursor-pointer text-left w-full ${
                selected ? 'shadow-inner' : ''
            }`}
        >
            {article.image ? (
                <div className="w-1/4 overflow-hidden block h-48 my-auto">
                    <img
                        className={`object-cover h-full ${imageDidLoad ? '' : 'hidden'}`}
                        src={article.image}
                        onLoad={() => handleOnload()}
                        alt={article.description}
                    ></img>
                    <span className={`animate-pulse ${!imageDidLoad ? '' : 'hidden'}`}>
                        <LoadingImage />
                    </span>
                </div>
            ) : (
                ''
            )}
            <div
                className={`py-4 px-2 flex flex-col justify-between h-full ${
                    article.image ? 'w-3/4' : 'w-full'
                } `}
            >
                <div className="px-4">
                    <div className="space-x-4 text-gray-100">
                        <span className="font-light">{createdAtString}</span>
                        {article.author ? <span>by {article.author}</span> : ''}
                    </div>
                    <h1
                        className="text-xl py-4 font-bold"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                </div>
                <div className="flex space-x-4 px-4 h-8 self-end overflow-hidden">
                    <CustomLink href={article.newsSourceObject.homepage}>
                        <ExternalLink className="mr-1" size="1rem" />{' '}
                        {article.newsSourceObject.name}
                    </CustomLink>

                    <CustomLink href={article.url}>
                        <Link className="mr-1" size="1rem" /> Article page
                    </CustomLink>
                </div>
            </div>
        </button>
    )
}

export default ArticleItem
