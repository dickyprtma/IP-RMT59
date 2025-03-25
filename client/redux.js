const { configureStore } = require("@reduxjs/toolkit");


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

const store = configureStore({
    // reducer -> pure function untuk mutate state
    reducer: counterSlice.reducer
})