import React from 'react'
import Menu from './components/Menu/Menu'
import ArticlesList from './components/ArticlesList/ArticlesList'
import Content from './components/Content'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

export const App = (): JSX.Element => {
    const { compact } = useSelector((state: RootState) => state.content)
    const currentGridSetup = compact
        ? 'grid-cols-mobile-main-list lg:grid-cols-main-list'
        : 'grid-cols-mobile-main-content lg:grid-cols-main-content'

    return (
        <div className={`w-screen h-screen grid gap-0 transition-grid-cols  ${currentGridSetup}`}>
            <section className="h-full">
                <Menu />
            </section>
            <section>
                <ArticlesList />
            </section>
            <section>
                <Content />
            </section>
        </div>
    )
}
