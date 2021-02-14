import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { sb } from '../lib/api'
import { fetchMoreArticles, getArticlesSuccess, setArticlesLoading } from './articles'
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
    actualFilters: {
        page: number
        items: number
        shownSources: string[]
        fromDate: string
        toDate: string
        search: string
    }
}

const initialFiltersState: FiltersState = {
    error: '',
    status: 'idle',
    sources: [],
    actualFilters: {
        page: 1,
        items: 10,
        shownSources: [],
        fromDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        toDate: dayjs().format('YYYY-MM-DD'),
        search: '',
    },
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        updateActualFilters(
            state,
            action: PayloadAction<{ newFilters: Partial<FiltersState['actualFilters']> }>,
        ) {
            state.actualFilters = {
                ...state.actualFilters,
                ...action.payload.newFilters,
            }
        },
        setFiltersLoading(state) {
            state.status = 'loading'
        },
        nextPage(state) {
            state.actualFilters.page = state.actualFilters.page + 1
        },
        getSourcesSuccess(state, action: PayloadAction<{ sources: NewsSource[] }>) {
            state.status = 'succeeded'
            state.sources = action.payload.sources
            state.actualFilters.shownSources = action.payload.sources.map((src) => src.id)
            state.error = ''
        },
        getSourcesFail(state) {
            state.status = 'failed'
            state.error = 'Failed to get news sources'
        },
    },
})

export const {
    updateActualFilters,
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
    dispatch(fetchMoreArticles())
}

const debouncedGetArticles = debounce(async (dispatch, filters) => {
    const result = await sb.getArticles(filters)
    dispatch(getArticlesSuccess({ result }))
}, 500)

export const updateFilters = (
    newFilters: Partial<FiltersState['actualFilters']>,
): AppThunk => async (dispatch, getState) => {
    console.log('RUNNING FILTER CHANGE')
    dispatch(updateActualFilters({ newFilters: { ...newFilters, page: 1 } }))
    dispatch(setArticlesLoading())
    await debouncedGetArticles(dispatch, getState().filters.actualFilters)
}
