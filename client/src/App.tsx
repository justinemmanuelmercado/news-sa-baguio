import React from 'react'
import Menu from './components/Menu'
import Articles from './components/Articles'

export const App = (): JSX.Element => {
    return (
        <div className="w-screen h-screen grid grid-cols-main gap-0">
            <section className="h-full max-w-xs">
                <Menu />
            </section>
            <section>
                <Articles />
            </section>
            <section className="bg-gray-500">Content</section>
        </div>
    )
}
