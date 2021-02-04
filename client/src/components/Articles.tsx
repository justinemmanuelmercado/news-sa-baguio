import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Article, fetchArticles } from '../redux/articles'
import { RootState } from '../redux/store'
import { fetchContent } from '../redux/content'
import truncate from 'lodash/truncate'

type HandleArticleClick = (id: string) => void

const Article = ({
    article,
    handleArticleClick,
}: {
    article: Article
    handleArticleClick: HandleArticleClick
}) => {
    const description = useMemo(() => {
        return truncate(article.description, { length: 100, omission: '...' })
    }, [article.description])

    return (
        <button
            onClick={() => handleArticleClick(article.id)}
            className="bg-gray-100 odd:bg-gray-50 flex flex-row rounded-sm mx-4 shadow-sm cursor-pointer text-left"
        >
            {article.image ? (
                <div className="w-1/4 border-r-8 border-gray-200 rounded-sm">
                    <img className="object-cover h-full rounded-sm" src={article.image}></img>
                </div>
            ) : (
                ''
            )}
            <div className={`px-6 py-6 space-y-2 ${article.image ? 'w-3/4' : ''}`}>
                <h1 className="font-black text-2xl text-black">{article.title}</h1>
                <p className="text-gray-800 text-base">{description}</p>
            </div>
        </button>
    )
}

function Articles(): JSX.Element {
    const dispatch = useDispatch()
    const { items, status } = useSelector((state: RootState) => state.articles)
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchArticles())
        }
        fetchData()
    }, [])
    console.log(items)

    const handleArticleClick = (id: string) => {
        dispatch(fetchContent(id))
    }

    return (
        <div className="max-h-screen overflow-scroll bg-white">
            <div className="space-y-4 py-4">
                {items.map((article) => {
                    return (
                        <Article
                            handleArticleClick={handleArticleClick}
                            article={article}
                            key={article.url}
                        />
                    )
                })}
            </div>
            {status === 'loading' && <p>Loading...</p>}
        </div>
    )
}

export default Articles
