import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'

function renderPage() {
    const rootElement = document.getElementById('app')

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
        rootElement,
    )
}

async function catchRerendersInDev() {
    // "monkey patches React to notify you [in console] about avoidable re-renders."
    if (import.meta.env.MODE !== 'production') {
        const whyDidYouRender = await import('@welldone-software/why-did-you-render')
        whyDidYouRender.default(React, { include: [/App/] })
    }
}

catchRerendersInDev().then(renderPage)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement

if (import.meta.hot) {
    import.meta.hot.accept()
}
