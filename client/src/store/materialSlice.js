import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../helpers/axiosInstance'
import Swal from 'sweetalert2'

// buat slicenya
const materialSlice = createSlice({
    name: "materialSlice",
    initialState: {
        data: []
    },
    reducers: {
        indexAction(state, action) {
            state.data = action.payload
        }
    }
})

// destructure dan export actions dan reducernya
export const { indexAction } = materialSlice.actions
export const materialReducer = materialSlice.reducer

// buat async thunk untuk menggenerate function yang mereturn sebuah action
// ini akan diapakai untuk didispatch di view agar state bisa diperbaruhi
export const index = createAsyncThunk("materialSlice/index", async (courseId, { dispatch }) => {
    try {
        const result = await axiosInstance({
            method: 'GET',
            url: `/courses/${courseId}/materials`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        const responseBody = result.data
        dispatch(indexAction(responseBody.data))
    } catch (error) {
        console.log(error)
        Swal.fire("Error", error, 'error')
    }
})
