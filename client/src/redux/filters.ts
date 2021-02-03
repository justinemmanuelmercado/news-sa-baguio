import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersState {
    sources: string[]
    rangeMin: number
    rangeMax: number
}

const initialFiltersState: FiltersState = {
    sources: ['ABS CBN', 'SunStar', 'Inquirer', 'Herald Express', 'Philippine Information Agency'],
    rangeMin: 0,
    rangeMax: 9,
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        setRangeMax(state, action: PayloadAction<{ rangeMax: number }>) {
            state.rangeMax = action.payload.rangeMax
        },
        setSources(state, action: PayloadAction<{ sources: string[] }>) {
            state.sources = action.payload.sources
        },
    },
})

export const { setRangeMax, setSources } = filtersSlice.actions
