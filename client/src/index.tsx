import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement

if (import.meta.hot) {
    import.meta.hot.accept()
}
