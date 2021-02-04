import { configureStore, combineReducers, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { articlesSlice } from './articles'
import { contentSlice } from './content'
import { filtersSlice } from './filters'

const rootReducer = combineReducers({
    articles: articlesSlice.reducer,
    filters: filtersSlice.reducer,
    content: contentSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({ reducer: rootReducer })

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
