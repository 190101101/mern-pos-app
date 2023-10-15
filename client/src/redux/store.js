import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice';
import searchSlice from './searchSlice';
import userSlice from './userSlice';

export default configureStore({
    reducer:{
        cart: cartSlice,
        search: searchSlice,
        user: userSlice,
    }
});