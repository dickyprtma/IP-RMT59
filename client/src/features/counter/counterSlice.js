// 3 create a redux state slice
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',

    // tempat untuk menyimpan state (diisi dengan nilai awal)
    initialState: {
        value: 0 // hitungan count nya
    },
    reducers: {
        // kumpulan function yang bisa merubah state
        incremented: (state, action) => {
            state.value += 1
        },
        decremented: (state, action) => {
            state.value -= 1
        }
    }
})

// 3.1 export 2 hal

export default counterSlice.reducer
export const { incremented, decremented } = counterSlice.actions