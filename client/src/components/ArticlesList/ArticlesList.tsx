import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchArticles } from '../../redux/articles'
import { RootState } from '../../redux/store'
import { fetchContent } from '../../redux/content'
import ArticleItem from './ArticleItem'

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

function ArticlesList(): JSX.Element {
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
                            <ArticleItem
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

export default ArticlesList
