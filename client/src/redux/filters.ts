import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sb } from '../lib/api'
import { fetchArticles } from './articles'
import { AppThunk } from './store'

export interface NewsSource {
    id: string
    name: string
    homepage: string
}
interface FiltersState {
    error: string
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    sources: NewsSource[]
    hiddenSources: string[]
    page: number
    items: number
}

const initialFiltersState: FiltersState = {
    error: '',
    status: 'idle',
    sources: [],
    hiddenSources: [],
    page: 1,
    items: 10,
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        setFiltersLoading(state) {
            state.status = 'loading'
        },
        nextPage(state) {
            state.page = state.page + 1
        },
        getSourcesSuccess(state, action: PayloadAction<{ sources: NewsSource[] }>) {
            state.status = 'succeeded'
            state.sources = action.payload.sources
            state.error = ''
        },
        getSourcesFail(state) {
            state.status = 'failed'
            state.error = 'Failed to get news sources'
        },
    },
})

export const {
    setFiltersLoading,
    nextPage,
    getSourcesSuccess,
    getSourcesFail,
} = filtersSlice.actions

export const fetchSources = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setFiltersLoading())
        const result = await sb.getNewsSources()
        dispatch(getSourcesSuccess({ sources: result }))
    } catch (err) {
        dispatch(getSourcesFail())
    }
}

export const loadNextPage = (): AppThunk => async (dispatch) => {
    dispatch(nextPage())
    dispatch(fetchArticles())
}
