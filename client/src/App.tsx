import React from 'react'
import Menu from './components/Menu/Menu'
import Articles from './components/Articles'
import Content from './components/Content'

export const App = (): JSX.Element => {
    return (
        <div className="w-screen h-screen grid grid-cols-main gap-0">
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
