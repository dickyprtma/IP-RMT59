import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const kanjiSlice = createSlice({
    name: "kanjiSlice",
    initialState: {
        data: []
    },
    reducers: {
        indexAction(state, action) {
            state.data = action.payload
        }
    }
})

export const { indexAction } = kanjiSlice.actions
export const kanjiReducer = kanjiSlice.reducer

// ini akan diinvoke di views
export const index = createAsyncThunk("kanjiSlice/index", async (_, { dispatch }) => {
    try {
        const response = await axios.get('https://kanjiapi.dev/v1/kanji/joyo');
        dispatch(indexAction(response.data)) // array of string
    } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan", 'error')
    }
})