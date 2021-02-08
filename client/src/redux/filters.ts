import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sb } from '../api'
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
    rangeMin: number
    rangeMax: number
}

const initialFiltersState: FiltersState = {
    error: '',
    status: 'idle',
    sources: [],
    hiddenSources: [],
    rangeMin: 0,
    rangeMax: 19,
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        setFiltersLoading(state) {
            state.status = 'loading'
        },
        setRangeMax(state, action: PayloadAction<{ rangeMax: number }>) {
            state.rangeMax = action.payload.rangeMax
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
    setRangeMax,
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
