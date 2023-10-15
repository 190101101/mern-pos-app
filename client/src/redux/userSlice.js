import {message} from 'antd';
import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: localStorage.getItem('user') ? 
        JSON.parse(localStorage.getItem('user')) : false
    },
    reducers:{
        setUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = JSON.parse(localStorage.getItem('user'));
        },
        removeUser: (state, action) => {
            localStorage.removeItem('user');
        },
    }
});

export const {setUser, getUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
