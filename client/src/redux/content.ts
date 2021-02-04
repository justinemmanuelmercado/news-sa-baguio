import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sb } from '../api'
import { AppThunk } from './store'

export interface Content {
    id: string
    url: string
    body: string
    title: string
    author?: string
    description?: string
    published?: string
    createdAt?: string
    links?: string
    image?: string
}

interface ContentState {
    item?: Content
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string
}

const initialContentState: ContentState = {
    error: '',
    status: 'idle',
}

export const contentSlice = createSlice({
    name: 'content',
    initialState: initialContentState,
    reducers: {
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

export const { getContentSuccess, getContentFailed, setContentLoading } = contentSlice.actions

export const fetchContent = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setContentLoading())
        const result = await sb.getArticleContent(id)
        dispatch(getContentSuccess({ result }))
    } catch (err) {
        dispatch(getContentFailed())
    }
}