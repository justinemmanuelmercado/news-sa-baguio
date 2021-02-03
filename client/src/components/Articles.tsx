import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Article, fetchArticles } from '../redux/articles'
import { RootState } from '../redux/store'
import truncate from 'lodash/truncate'

const Article = ({ article }: { article: Article }) => {
    const description = useMemo(() => {
        return truncate(article.description, { length: 100, omission: '...' })
    }, [article.description])

    return (
        <div className="bg-gray-500 odd:bg-gray-400 flex flex-row rounded-sm mx-4 shadow-md">
            <div className="px-6 py-6 space-y-2">
                <h1 className="font-black text-2xl text-gray-200">{article.title}</h1>
                <p className="text-gray-300 text-base">{description}</p>
            </div>
            {article.image ? (
                <img
                    className="object-cover h-auto w-1/4 rounded-sm border-8 border-gray-300"
                    src={article.image}
                ></img>
            ) : (
                ''
            )}
        </div>
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

    return (
        <div className="max-h-screen overflow-scroll bg-gray-500">
            <div className="space-y-4 py-6">
                {items.map((article) => {
                    return <Article article={article} key={article.url} />
                })}
            </div>
            {status === 'loading' && <p>Loading...</p>}
        </div>
    )
}

export default Articles
