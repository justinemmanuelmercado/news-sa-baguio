import React from 'react'

export const App = (): JSX.Element => {
    return (
        <div className="w-screen h-screen grid grid-cols-3 gap-4">
            <section className="h-full p-8">Menu</section>
            <section>Articles</section>
            <section>Content</section>
        </div>
    )
}
