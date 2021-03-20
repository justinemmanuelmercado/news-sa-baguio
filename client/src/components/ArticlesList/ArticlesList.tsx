import React, { useContext, useEffect, useRef } from 'react'
import { Article } from '../../redux/articles'
import ArticleItem from './ArticleItem'
import debounce from 'lodash/debounce'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from 'react-query'
import { CompactContentContext } from '../AppBody'
export const LoadingImage = (): JSX.Element => {
    return (
        <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <div className="h-5 w-5 bg-gray-400 rounded-full" />
            <div className="bg-white w-8 h-8 rounded-full"></div>
        </div>
    )
}
const LoadingArticle = () => {
    return (
        <div className="animate-pulse bg-gray-50 odd:bg-gray-100 flex flex-row rounded-sm shadow-lg text-left h-40 min-h-32 hover:text-green-100 border border-gray-400 w-full">
            <div className="w-1/4 h-40 min-h-32 overflow-hidden rounded-sm p-1">
                <LoadingImage />
            </div>
            <div className="w-3/4 px-6 py-6 space-y-2 h-40 min-h-32">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
            </div>
        </div>
    )
}

function ArticlesList({
    articles,
    status,
    fetchNextPage,
    setContentId,
    contentId,
}: {
    articles: InfiniteData<Article[]>
    status: string
    fetchNextPage: (
        options?: FetchNextPageOptions,
    ) => Promise<InfiniteQueryObserverResult<Article[], unknown>>
    setContentId: (id: string) => void
    contentId: string
}): JSX.Element {
    const { setCompactContent } = useContext(CompactContentContext)
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
        setCompactContent(false)
        setContentId(id)
    }

    return (
        <div ref={panelRef} className="h-full overflow-y-scroll">
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
                                            selected={article.id === contentId}
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
