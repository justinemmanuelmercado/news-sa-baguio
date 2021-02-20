import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
const rootElement = document.getElementById('app')

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path={['/:id', '/']}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    rootElement,
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement

if (import.meta.hot) {
    import.meta.hot.accept()
}
