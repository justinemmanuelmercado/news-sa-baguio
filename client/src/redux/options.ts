import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NewsSource {
    id: string
    name: string
    homepage: string
}
interface OptionsState {
    compactMode: boolean
}

const initialOptionsState: OptionsState = {
    compactMode: false,
}

export const optionsSlice = createSlice({
    name: 'Options',
    initialState: initialOptionsState,
    reducers: {
        setCompactMode(state, action: PayloadAction<{ compactMode: boolean }>) {
            state.compactMode = action.payload.compactMode
        },
    },
})

export const { setCompactMode } = optionsSlice.actions
