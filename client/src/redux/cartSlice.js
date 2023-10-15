import {message} from 'antd';
import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        cartItems: 
            localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')).cartItems : [],
        total: 
            localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')).total : 0,
        tax: 1,
    },
    reducers:{
        addProduct: (state, action) => {
            const findCartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            );

            if(findCartItem){
                findCartItem.quantity = findCartItem.quantity + 1;
            }else{
                state.cartItems.push(action.payload);
            }

            state.total += action.payload.price;
            message.success('item added');
        },
        deleteCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload._id
            );

            state.total -= action.payload.price * action.payload.quantity;
            message.success('item deleted');
        },
        increment: (state, action) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            cartItem.quantity += 1;
            state.total += cartItem.price;
        },
        decrement: (state, action) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            
            cartItem.quantity -= 1;

            if(cartItem.quantity === 0){
                state.cartItems = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                );                
                message.success('item deleted');
            }

            state.total -= cartItem.price;
        },
        clear: (state, action) => {
            state.cartItems = [];
            state.total = 0;
            message.success("cart cleared");
        }
    }
});

export const {addProduct, deleteCart, increment, decrement, clear} = cartSlice.actions;

export default cartSlice.reducer;
