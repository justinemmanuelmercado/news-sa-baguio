import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Article } from '../../redux/articles'
import { RootState } from '../../redux/store'
import { fetchContent } from '../../redux/content'
import ArticleItem from './ArticleItem'
import debounce from 'lodash/debounce'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from 'react-query'

const LoadingArticle = () => {
    return (
        <div className="animate-pulse bg-gray-100 odd:bg-gray-50 flex flex-row rounded-sm shadow-lg text-left h-40 min-h-32 hover:text-green-100 border border-gray-300 w-full">
            <div className="w-1/4 h-40 min-h-32 overflow-hidden rounded-sm p-1">
                <div className="bg-gray-200 w-full h-full flex items-center justify-center ">
                    <div className="h-5 w-5 bg-gray-100 rounded-full" />
                    <div className="bg-white w-8 h-8 rounded-full"></div>
                </div>
            </div>
            <div className="w-3/4 px-6 py-6 space-y-2 h-40 min-h-32">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}

function ArticlesList({
    articles,
    status,
    fetchNextPage,
}: {
    articles: InfiniteData<Article[]>
    status: string
    fetchNextPage: (
        options?: FetchNextPageOptions,
    ) => Promise<InfiniteQueryObserverResult<Article[], unknown>>
}): JSX.Element {
    const dispatch = useDispatch()
    const { item } = useSelector((state: RootState) => state.content)
    const panelRef = useRef<HTMLDivElement>(null)
    const attachScrollRef = () => {
        if (panelRef.current) {
            panelRef.current.addEventListener(
                'scroll',
                debounce(async () => {
                    if (
                        panelRef.current.scrollTop + panelRef.current.clientHeight >=
                        panelRef.current.scrollHeight - 200
                    ) {
                        fetchNextPage()
                    }
                }, 300),
            )
        }
    }

    useEffect(() => {
        attachScrollRef()
    }, [])

    const handleArticleClick = (id: string) => {
        dispatch(fetchContent(id))
    }

    return (
        <div ref={panelRef} className="bg-white h-full overflow-y-scroll">
            <div className="space-y-4 p-4">
                {status === 'loading' ? (
                    <>
                        <LoadingArticle />
                        <LoadingArticle />
                    </>
                ) : (
                    articles.pages.map((articlePage, i) => {
                        return (
                            <React.Fragment key={i}>
                                {articlePage.map((article) => {
                                    return (
                                        <ArticleItem
                                            selected={item?.id === article.id}
                                            handleArticleClick={handleArticleClick}
                                            article={article}
                                            key={article.id}
                                        />
                                    )
                                })}
                            </React.Fragment>
                        )
                    })
                )}
                <LoadingArticle />
            </div>
        </div>
    )
}

export default ArticlesList
