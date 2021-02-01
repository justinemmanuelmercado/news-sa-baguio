import { sb } from './api'
import {
    createSlice,
    configureStore,
    PayloadAction,
    combineReducers,
    Action,
} from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

export interface Article {
    url?: string
    links?: string[]
    title?: string
    description?: string
    image?: string
    author?: string
    content?: string
    source?: string
    published?: string
    ttr?: number
    createdAt?: string
    newsSource: string
}

interface ArticlesState {
    articles: Article[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string
}

const initialArticlesState: ArticlesState = {
    articles: [],
    error: '',
    status: 'idle',
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState: initialArticlesState,
    reducers: {
        getArticlesSuccess(state, action: PayloadAction<{ result: Article[] }>) {
            console.log('PAYLOAD:', action)
            state.articles = action.payload.result
            state.status = 'succeeded'
            state.error = ''
        },
        getArticlesFailed(state) {
            state.articles = []
            state.status = 'failed'
            state.error = 'Failed to get articles'
            state = { articles: [], status: 'failed', error: 'Failed to get articles' }
        },
    },
})

export const { getArticlesSuccess, getArticlesFailed } = articlesSlice.actions

const rootReducer = combineReducers({
    articles: articlesSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({ reducer: rootReducer })

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const fetchArticles = (): AppThunk => async (dispatch) => {
    try {
        const result = await sb.getArticles()
        dispatch(getArticlesSuccess({ result }))
    } catch (err) {
        dispatch(getArticlesFailed())
    }
}
