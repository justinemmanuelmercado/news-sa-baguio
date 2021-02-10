import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Article, fetchArticles } from '../redux/articles'
import { RootState } from '../redux/store'
import { fetchContent } from '../redux/content'
import truncate from 'lodash/truncate'

type HandleArticleClick = (id: string) => void

const LoadingArticle = () => {
    return (
        <div className="animate-pulse bg-gray-100 odd:bg-gray-50 flex flex-row rounded-sm shadow-lg text-left max-h-36 hover:text-green-100 border border-gray-300 w-full">
            <div className="w-1/4 h-36 overflow-hidden rounded-sm p-1">
                <div className="bg-gray-200 w-full h-full flex items-center justify-center ">
                    <div className="h-5 w-5 bg-gray-100 rounded-full" />
                    <div className="bg-white w-8 h-8 rounded-full"></div>
                </div>
            </div>
            <div className="w-3/4 px-6 py-6 space-y-2 h-36">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}

const Article = ({
    article,
    handleArticleClick,
    selected,
}: {
    article: Article
    handleArticleClick: HandleArticleClick
    selected: boolean
}) => {
    const [imageDidLoad, setImageDidLoad] = useState<boolean>(false)
    const title = useMemo(() => {
        return truncate(article.title, { length: 110, separator: ' ', omission: '...' })
    }, [article.title])

    const handleOnload = () => {
        setImageDidLoad(true)
    }

    return (
        <button
            onClick={() => handleArticleClick(article.id)}
            className={`bg-gray-100 odd:bg-gray-50 flex flex-row rounded-sm cursor-pointer text-left max-h-36 hover:text-green-100 border border-gray-300 w-full ${
                selected ? 'shadow-inner' : 'shadow-lg'
            }`}
        >
            {article.image ? (
                <div className="w-1/4 h-36 overflow-hidden rounded-sm p-1">
                    <img
                        className={`object-cover h-full rounded-sm ${imageDidLoad ? '' : 'hidden'}`}
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
                className={`px-4 py-2 h-36 ${article.image ? 'w-3/4' : ''} ${
                    selected ? 'border-r-4 border-green-100' : ''
                }`}
            >
                <h1 className="font-bold text-xl">{title}</h1>
            </div>
        </button>
    )
}

function Articles(): JSX.Element {
    const dispatch = useDispatch()
    const { items, status } = useSelector((state: RootState) => state.articles)
    const { item } = useSelector((state: RootState) => state.content)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchArticles())
        }
        fetchData()
    }, [])

    const handleArticleClick = (id: string) => {
        dispatch(fetchContent(id))
    }

    return (
        <div className="h-screen overflow-scroll bg-white">
            <div className="space-y-4 p-4">
                {status === 'loading' ? (
                    <>
                        <LoadingArticle />
                        <LoadingArticle />
                        <LoadingArticle />
                    </>
                ) : (
                    items.map((article) => {
                        return (
                            <Article
                                selected={item?.id === article.id}
                                handleArticleClick={handleArticleClick}
                                article={article}
                                key={article.url}
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Articles
