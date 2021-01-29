import React from 'react'
import Menu from './components/Menu'

export const App = (): JSX.Element => {
    return (
        <div className="w-screen h-screen grid grid-cols-3 gap-0">
            <section className="h-full">
                <Menu />
            </section>
            <section>Articles</section>
            <section>Content</section>
        </div>
    )
}
