import React from 'react'
import Menu from './components/Menu/Menu'
import Articles from './components/Articles'
import Content from './components/Content'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

export const App = (): JSX.Element => {
    const { status: contentStatus } = useSelector((state: RootState) => state.content)
    const currentGridSetup =
        contentStatus === 'idle' ? 'grid-cols-main-list' : 'grid-cols-main-content'

    return (
        <div className={`w-screen h-screen grid gap-0 transition-grid-cols ${currentGridSetup}`}>
            <section className="h-full">
                <Menu />
            </section>
            <section>
                <Articles />
            </section>
            <section>
                <Content />
            </section>
        </div>
    )
}
