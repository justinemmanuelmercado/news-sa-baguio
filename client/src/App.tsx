import React, { useState } from 'react'
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
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false)

    return (
        <div className="grid-rows-app h-screen grid">
            <header className="w-screen bg-green-100">Menu</header>
            <div
                className={`w-screen grid gap-0 transition-grid-cols h-full overflow-auto ${currentGridSetup}`}
            >
                <section
                    className={` fixed ${
                        menuExpanded ? 'w-3/4' : 'w-0'
                    } lg:w-60 lg:relative overflow-y-scroll h-full`}
                >
                    {/* <button
                    className="fixed m-2 top-10 left-10 p-4 bg-green-100"
                    onClick={() => setMenuExpanded(!menuExpanded)}
                >
                    EXPAND MENU
                </button> */}
                    <Menu />
                </section>
                <section className="overflow-y-scroll h-full">
                    <ArticlesList />
                </section>
                <section className="overflow-y-scroll h-full">
                    <Content />
                </section>
            </div>
        </div>
    )
}
