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
        <div className="bg-gray-100 odd:bg-gray-50 flex flex-row rounded-sm mx-4 shadow-sm">
            {article.image ? (
                <img
                    className="object-cover h-auto w-1/4 rounded-sm shadow-inner border-8 border-white"
                    src={article.image}
                ></img>
            ) : (
                ''
            )}
            <div className="px-6 py-6 space-y-2">
                <h1 className="font-black text-2xl text-black">{article.title}</h1>
                <p className="text-gray-800 text-base">{description}</p>
            </div>
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
        <div className="max-h-screen overflow-scroll bg-white">
            <div className="space-y-4 py-4">
                {items.map((article) => {
                    return <Article article={article} key={article.url} />
                })}
            </div>
            {status === 'loading' && <p>Loading...</p>}
        </div>
    )
}

export default Articles
