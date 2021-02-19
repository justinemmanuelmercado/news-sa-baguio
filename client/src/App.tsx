import React, { useState } from 'react'
import Menu from './components/Menu/Menu'
import ArticlesList from './components/ArticlesList/ArticlesList'
import Content from './components/Content'
import Header from './components/Header'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { useInfiniteQuery } from 'react-query'
import { sb } from './lib/api'
import dayjs from 'dayjs'
import MenuLayout from './components/Menu/MenuLayout'
import { xor } from 'lodash'
import { Filter } from 'react-feather'
import FilterMenu from './components/Menu/FilterMenu'
import SearchMenu from './components/Menu/SearchMenu'

export interface Filters {
    items: number
    shownSources: string[]
    fromDate: string
    toDate: string
    search: string
}

const AppBody = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const { compact } = useSelector((state: RootState) => state.content)
    const currentGridSetup = compact
        ? 'grid-cols-mobile-main-list lg:grid-cols-main-list'
        : 'grid-cols-mobile-main-content lg:grid-cols-main-content'
    return (
        <div
            className={`w-screen grid gap-0 transition-grid-cols h-full overflow-auto ${currentGridSetup}`}
        >
            {children}
        </div>
    )
}

export const App = (): JSX.Element => {
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false)
    const [filters, setFilters] = useState<Filters>({
        items: 10,
        shownSources: [],
        fromDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD'),
        search: '',
    })

    const {
        status: articlesStatus,
        data: articles,
        error: articlesError,
        fetchNextPage,
    } = useInfiniteQuery(
        ['articles', filters],
        ({ pageParam = 1 }) => sb.getArticles({ ...filters, page: pageParam }),
        { getNextPageParam: (_, pages) => pages.length + 1 },
    )

    const [expandedMenus, setExpandedMenus] = useState<string[]>(['Filter', 'Search', 'Options'])

    const toggleExpand = (name: string) => {
        const newExpanded = xor(expandedMenus, [name])
        setExpandedMenus(newExpanded)
    }

    return (
        <div className="grid-rows-app h-screen grid">
            <Header setMenuExpanded={setMenuExpanded} menuExpanded={menuExpanded} />
            <AppBody>
                <section
                    className={` fixed z-20 ${
                        menuExpanded ? 'w-full' : 'w-0'
                    } lg:w-60 lg:relative overflow-y-scroll h-full transition-width lg:transition-none`}
                >
                    <Menu>
                        <MenuLayout
                            Icon={Filter}
                            toggleExpand={toggleExpand}
                            name="Filter"
                            isActive={expandedMenus.indexOf('Filter') !== -1}
                        >
                            <FilterMenu filters={filters} setFilters={setFilters} />
                        </MenuLayout>
                        <MenuLayout
                            Icon={Filter}
                            toggleExpand={toggleExpand}
                            name="Search"
                            isActive={expandedMenus.indexOf('Search') !== -1}
                        >
                            <SearchMenu filters={filters} setFilters={setFilters} />
                        </MenuLayout>
                    </Menu>
                </section>
                <section className="overflow-y-scroll">
                    <ArticlesList
                        status={articlesStatus}
                        articles={articles}
                        fetchNextPage={fetchNextPage}
                    />
                </section>
                <section className="overflow-y-scroll h-full">
                    <Content />
                </section>
            </AppBody>
        </div>
    )
}
