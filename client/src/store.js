import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import coursesReducer from "./features/courses/coursesSlice"
// 1. create a redux store
export const store = configureStore({

    //4. add slice reducers to the store
    reducer: {
        counter: counterReducer,
        courses: coursesReducer
    }
})


// 2. provide redux store ke react app kita

