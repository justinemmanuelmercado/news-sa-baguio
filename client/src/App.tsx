import React, { useMemo, useState } from 'react'
import Menu from './components/Menu/Menu'
import ArticlesList from './components/ArticlesList/ArticlesList'
import Content from './components/Content'
import Header from './components/Header'
import { useInfiniteQuery, useQuery } from 'react-query'
import { sb } from './lib/api'
import dayjs from 'dayjs'
import MenuLayout from './components/Menu/MenuLayout'
import { reduce } from 'lodash'
import { Book, Calendar, Search } from 'react-feather'
import SourcesMenu from './components/Menu/SourcesMenu'
import DateMenu from './components/Menu/DateMenu'
import SearchMenu from './components/Menu/SearchMenu'
import { AppBody } from './components/AppBody'
import { useParams, useHistory } from 'react-router-dom'
export interface Filters {
    items: number
    hiddenSources: string[]
    fromDate: string
    toDate: string
    search: string
}
export const App = (): JSX.Element => {
    const params = useParams<{ id?: string }>()
    const history = useHistory()
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false)
    const [contentId, setContentId] = useState<string>(params.id ? params.id : '')
    const [filters, setFilters] = useState<Filters>({
        items: 10,
        hiddenSources: [],
        fromDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD'),
        search: '',
    })
    const [dayToday] = useState<string>(dayjs().format('DD-MM-YYYY'))

    const { data: sources, status: sourcesStatus } = useQuery(['sources', dayToday], () =>
        sb.getNewsSources(),
    )

    const shownSources = useMemo(() => {
        return reduce(
            sources,
            (r, v) => {
                if (!filters.hiddenSources.includes(v.id)) {
                    r.push(v.id)
                }
                return r
            },
            [],
        )
    }, [filters.hiddenSources])

    const { status: articlesStatus, data: articles, fetchNextPage } = useInfiniteQuery(
        ['articles', filters],
        ({ pageParam = 1 }) => sb.getArticles({ ...filters, page: pageParam, shownSources }),
        { getNextPageParam: (_, pages) => pages.length + 1 },
    )

    const { status: contentStatus, data: content } = useQuery(
        ['content', contentId],
        () => sb.getArticleContent(contentId),
        { enabled: contentId.length > 0 },
    )

    const menuSectionClass = `fixed z-20 ${
        menuExpanded ? 'w-screen' : 'w-0'
    } lg:w-full lg:relative overflow-y-auto h-full transition-width lg:transition-none bg-gray-800`

    const updateContentId = (id: string) => {
        setContentId(id)
        history.push(`/${id}`)
    }
    return (
        <main className="grid-rows-app h-screen grid">
            <Header setMenuExpanded={setMenuExpanded} menuExpanded={menuExpanded} />
            <AppBody defaultCompact={!params.id}>
                <section className={menuSectionClass}>
                    <Menu>
                        <MenuLayout icon={Book} name="Sources">
                            <SourcesMenu
                                sources={sources}
                                sourcesStatus={sourcesStatus}
                                filters={filters}
                                setFilters={setFilters}
                            />
                        </MenuLayout>
                        <MenuLayout icon={Calendar} name="Date">
                            <DateMenu filters={filters} setFilters={setFilters} />
                        </MenuLayout>
                        <MenuLayout icon={Search} name="Search">
                            <SearchMenu filters={filters} setFilters={setFilters} />
                        </MenuLayout>
                    </Menu>
                </section>
                <section className="overflow-y-hidden bg-gray-800">
                    <ArticlesList
                        status={articlesStatus}
                        articles={articles}
                        fetchNextPage={fetchNextPage}
                        setContentId={updateContentId}
                        contentId={contentId}
                    />
                </section>

                <section className="overflow-y-scroll h-full">
                    <Content content={content} status={contentStatus} />
                </section>
            </AppBody>
        </main>
    )
}
