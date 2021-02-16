import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'

const rootElement = document.getElementById('app')

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    rootElement,
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement

if (import.meta.hot) {
    import.meta.hot.accept()
}
