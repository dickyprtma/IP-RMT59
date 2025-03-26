import { configureStore } from "@reduxjs/toolkit";
import { coursesReducer } from "./coursesSlice";
import { materialReducer } from "./materialSlice";

export const store = configureStore({
    reducer: {
        courses: coursesReducer, // todo naming convention belum ajib
        materialReducer: materialReducer
    }
})


