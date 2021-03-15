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
        <button
            aria-label={`Read article: ${article.title}`}
            onClick={() => handleArticleClick(article.id)}
            className={`focus:outline-black bg-gray-50 odd:bg-gray-100 flex flex-row rounded-sm cursor-pointer text-left max-h-40 min-h-32 hover:text-green-100 border border-gray-900 w-full ${
                selected ? 'shadow-inner' : 'shadow-lg'
            }`}
        >
            {article.image ? (
                <div className="w-1/4 h-40 min-h-32 py-1 overflow-hidden rounded-sm">
                    <img
                        className={`object-cover w-full h-full rounded-sm ${
                            imageDidLoad ? '' : 'hidden'
                        }`}
                        src={article.image}
                        onLoad={() => handleOnload()}
                        alt={article.description}
                    ></img>
                    <span className="animate-pulse">
                        <LoadingImage />
                    </span>
                </div>
            ) : (
                ''
            )}
            <div
                className={`h-40 min-h-32 py-1 flex flex-col justify-between ${
                    article.image ? 'w-3/4' : 'w-full'
                } ${selected ? 'border-r-4 border-green-100' : ''}`}
            >
                <div className="px-4">
                    <div className="space-x-4">
                        <span className="text-black">
                            {article.author ? article.author : article.newsSourceObject.name}
                        </span>
                        <span className="font-light text-gray-800">{createdAtString}</span>
                    </div>
                    <h1
                        className="text-xl font-bold text-black"
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
