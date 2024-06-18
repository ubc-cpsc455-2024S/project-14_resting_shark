import { configureStore } from '@reduxjs/toolkit'
import lessonPageReducer from "./slices/lessonPageSlice";
import dashboardPageReducer from "./slices/dashboardSlice"

const store = configureStore({
  reducer: {
    lessonPage: lessonPageReducer,
    dashboardPage: dashboardPageReducer,
  }
});

export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch