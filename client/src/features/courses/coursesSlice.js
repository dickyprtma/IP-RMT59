import { createSlice } from '@reduxjs/toolkit'

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        list: []
    },
    reducers: {
        setCourses: (state, action) => {
            state.list = action.payload
        }
    }
})

export const { setCourses } = coursesSlice.actions
export default coursesSlice.reducer