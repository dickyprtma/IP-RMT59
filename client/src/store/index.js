import { configureStore } from "@reduxjs/toolkit";
import { coursesReducer } from "./coursesSlice";
import { materialReducer } from "./materialSlice";
import { userCourseReducer } from "./userCourseSlice";
import { kanjiReducer } from "./kanjiSlice";

export const store = configureStore({
    reducer: {
        courses: coursesReducer, // todo naming convention belum ajib
        materialReducer: materialReducer,
        userCourseReducer: userCourseReducer,
        kanjiReducer: kanjiReducer
    }
})


