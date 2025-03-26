import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../helpers/axiosInstance'
import Swal from 'sweetalert2'

// membuaat sebuah slice/toolkit
const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        responseBody: {
            message: "",
            data: []
        },
        data: [], // diisi di action index
        course: {} // diisi di action show
    },
    reducers: { // <-- reducers : bertugas menghandle sekumpulan actions
        // seluruh actions yang kita miliki ada disini

        responseBodyAction(state, action) {
            state.responseBody = action.payload
        },
        indexAction(state, action) {
            // state data akan diisi pada saat thunk dijalankan di view melalui payload
            state.data = action.payload
        },
        showAction(state, action) {
            state.course = action.payload
        }
    }
})

// destructure actions kita untuk di export
export const { responseBodyAction, indexAction, showAction } = coursesSlice.actions

// export reducer kita
export const coursesReducer = coursesSlice.reducer


// ini akan diinvoke di views

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async (_, { dispatch }) => {
    try {
        const result = await axiosInstance({
            method: 'GET',
            url: '/courses',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        const responseBody = result.data
        dispatch(responseBodyAction(responseBody))
        dispatch(indexAction(responseBody.data))
    } catch (error) {
        console.log(error)
        Swal.fire("Error", error, 'error')
    }
})

export const show = createAsyncThunk("courses/show", async (id, { dispatch }) => {
    try {
        const result = await axiosInstance({
            method: 'GET',
            url: `/courses/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        const responseBody = result.data
        dispatch(showAction(responseBody.data))
    } catch (error) {
        console.log(error)
        Swal.fire("Error", error, 'error')
    }
})
