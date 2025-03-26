import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../helpers/axiosInstance'
import Swal from 'sweetalert2'

// buat slicenya
const userCourseSlice = createSlice({
    name: "userCourseSlice",
    initialState: {
        data: [],
        isEnrolled: false
    },
    reducers: {
        indexAction(state, action) {
            state.data = action.payload
        },
        isEnrolledAction(state, action) {
            state.isEnrolled = action.payload
        },
        setEnrollmentStatus(state, action) {
            state.isEnrolled = action.payload
        }
    }
})

// destructure dan export actions dan reducernya
export const { indexAction, isEnrolledAction, setEnrollmentStatus } = userCourseSlice.actions
export const userCourseReducer = userCourseSlice.reducer

// buat async thunk untuk menggenerate function yang mereturn sebuah action
// ini akan diapakai untuk didispatch di view agar state bisa diperbaruhi
export const index = createAsyncThunk("userCourseSlice/index", async ({ courseId, userId }, { dispatch }) => {
    try {
        const result = await axiosInstance({
            method: 'GET',
            url: `/user-courses`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        const responseBody = result.data

        // check if user is enrolled
        let isEnrolledCurrently = false
        for (let i = 0; i < responseBody.length; i++) {
            if (responseBody[i].UserCourse.CourseId === Number(courseId) && responseBody[i].UserCourse.UserId === Number(userId)) {
                isEnrolledCurrently = true
                break
            }
            // console.log(responseBody[i].UserCourse.CourseId, courseId, responseBody[i].UserCourse.UserId, userId)
        }
        console.log(isEnrolledCurrently) // true tetapi di detail course tidak berubah
        dispatch(isEnrolledAction(isEnrolledCurrently))
        dispatch(indexAction(responseBody))
    } catch (error) {
        console.log(error)
        Swal.fire("Error", error, 'error')
    }
})


// Create async thunk to toggle user course enrollment
export const toggleUserCourse = createAsyncThunk("userCourseSlice/toggleUserCourse", async ({ courseId, userId }, { dispatch, getState }) => {
    try {
        // Check if user is enrolled
        const state = getState()
        const isEnrolled = state.userCourseReducer.isEnrolled

        if (isEnrolled) {
            // User is enrolled, call DELETE endpoint
            await axiosInstance({
                method: 'DELETE',
                url: `/user-courses`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
                data: {
                    courseId,
                    userId
                }
            })
            Swal.fire("Success", "You have been unenrolled from the course", 'success')
            dispatch(setEnrollmentStatus(false))
        } else {
            // User is not enrolled, call POST endpoint
            await axiosInstance({
                method: 'POST',
                url: `/user-courses`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                },
                data: {
                    courseId,
                    userId
                }
            })
            Swal.fire("Success", "You have been enrolled in the course", 'success')
            dispatch(setEnrollmentStatus(true))
        }

        // // Re-fetch user courses to update the state
        // dispatch(indexUserCourse({ courseId, userId })) 
        // ^^ di views aja
    } catch (error) {
        console.log(error)
        Swal.fire("Error", error, 'error')
    }
})
