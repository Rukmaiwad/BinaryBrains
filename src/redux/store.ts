import { configureStore } from '@reduxjs/toolkit'

/**
 * Slices
 * Name should be same which we are passing and will be using as reducer name while importing eg; counter
 */

import counter from './slices/counter' 

export const store = configureStore({
  reducer: {
    counter
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch