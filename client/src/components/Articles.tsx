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
    const title = useMemo(() => {
        return truncate(article.title, { length: 110, separator: ' ', omission: '...' })
    }, [article.title])
    return (
        <button
            onClick={() => handleArticleClick(article.id)}
            className="bg-gray-100 odd:bg-gray-50 flex flex-row rounded-sm shadow-sm cursor-pointer text-left mx-3 max-h-36"
        >
            {article.image ? (
                <div className="w-1/4 rounded-sm">
                    <img className="object-cover h-36 rounded-sm" src={article.image}></img>
                </div>
            ) : (
                ''
            )}
            <div className={`px-6 py-6 space-y-2 ${article.image ? 'w-3/4' : ''}`}>
                <h1 className="font-bold text-xl text-black">{title}</h1>
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
