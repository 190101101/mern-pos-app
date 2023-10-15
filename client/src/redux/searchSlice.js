import {message} from 'antd';
import {createSlice} from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: 'search',
    initialState:{
        search: '',
    },
    reducers:{
        searchProduct: (state, action) => {
            state.search = action.payload;
        },
    }
});

export const {searchProduct} = searchSlice.actions;

export default searchSlice.reducer;
