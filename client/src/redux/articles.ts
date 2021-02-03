import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sb } from '../api'
import { AppThunk } from './store'

export interface Article {
    url?: string
    links?: string[]
    title?: string
    description?: string
    image?: string
    author?: string
    source?: string
    published?: string
    ttr?: number
    createdAt?: string
}

interface ArticlesState {
    items: Article[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string
}

const initialArticlesState: ArticlesState = {
    items: [],
    error: '',
    status: 'idle',
}

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: initialArticlesState,
    reducers: {
        setArticlesLoading(state) {
            state.status = 'loading'
        },
        getArticlesSuccess(state, action: PayloadAction<{ result: Article[] }>) {
            state.items = action.payload.result
            state.status = 'succeeded'
            state.error = ''
        },
        getArticlesFailed(state) {
            state.status = 'failed'
            state.error = 'Failed to get articles'
        },
    },
})

export const { getArticlesSuccess, getArticlesFailed, setArticlesLoading } = articlesSlice.actions

export const fetchArticles = (): AppThunk => async (dispatch, getState) => {
    const { filters } = getState()
    try {
        dispatch(setArticlesLoading())
        const result = await sb.getArticles(filters)
        dispatch(getArticlesSuccess({ result }))
    } catch (err) {
        dispatch(getArticlesFailed())
    }
}
