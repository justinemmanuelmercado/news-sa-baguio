import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sb } from '../lib/api'
import { NewsSource } from './filters'
import { AppThunk } from './store'

export interface Content {
    id: string
    url?: string
    body?: string
    title?: string
    author?: string
    description?: string
    published?: string
    createdAt?: string
    links?: string
    image?: string
    newsSource?: NewsSource
}

interface ContentState {
    item: Content | null
    compact: boolean
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string
}

const initialContentState: ContentState = {
    item: null,
    compact: true,
    error: '',
    status: 'idle',
}

export const contentSlice = createSlice({
    name: 'content',
    initialState: initialContentState,
    reducers: {
        /**
         * This is mainly for getting the
         * articles list to identify
         * which article is selected
         */
        setCompact(state, action: PayloadAction<{ compact: boolean }>) {
            state.compact = action.payload.compact
        },
        setContentId(state, action: PayloadAction<{ id: string }>) {
            state.item = { id: action.payload.id }
        },
        setContentLoading(state) {
            state.status = 'loading'
        },
        getContentSuccess(state, action: PayloadAction<{ result: Content }>) {
            state.item = action.payload.result
            state.status = 'succeeded'
            state.error = ''
        },
        getContentFailed(state) {
            state.status = 'failed'
            state.error = 'Failed to get articles'
        },
    },
})

export const {
    setCompact,
    getContentSuccess,
    getContentFailed,
    setContentLoading,
    setContentId,
} = contentSlice.actions

export const fetchContent = (id: string): AppThunk => async (dispatch) => {
    dispatch(setContentId({ id }))
    try {
        dispatch(setCompact({ compact: false }))
        dispatch(setContentLoading())
        const result = await sb.getArticleContent(id)
        dispatch(getContentSuccess({ result }))
    } catch (err) {
        dispatch(getContentFailed())
    }
}
