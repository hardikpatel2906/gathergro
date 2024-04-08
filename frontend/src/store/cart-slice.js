import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0, changed: false },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem._id);
            // state.totalQuantity++;
            newItem.quantity ? state.totalQuantity = newItem.quantity + state.totalQuantity : state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                  id: newItem._id,
                  price: newItem.price,
                  image: newItem.productImages,
                  quantity: newItem.quantity ? newItem.quantity : 1,
                  totalPrice: newItem.quantity
                    ? newItem.price * newItem.quantity
                    : newItem.price,
                  productName: newItem.productName,
                  vendorId: newItem.vendorId,
                });
            } else {
                newItem.quantity ? existingItem.quantity = existingItem.quantity + newItem.quantity : existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + (newItem.quantity ? newItem.quantity * newItem.price : newItem.price)
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeItemFromCart(state, action) {
            const newItem = action.payload;
            const itemData = state.items.find(item => item.id === newItem.id);
            state.changed = true;
            if (itemData) {
                const index = state.items.findIndex(item => item.id === newItem.id);
                state.items.splice(index, 1);
                state.totalQuantity = state.totalQuantity - newItem.quantity
                itemData.totalPrice = itemData.totalPrice - (newItem.quantity * newItem.price);
            }
            localStorage.setItem('cart', JSON.stringify(state))
        },
        addQuantity(state, action) {
            const newItem = action.payload;
            const itemData = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (itemData) {
                itemData.quantity++;
                itemData.totalPrice = itemData.totalPrice + newItem.price;
            }
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeQuantity(state, action) {
            const newItem = action.payload;
            const itemData = state.items.find(item => item.id === newItem.id);
            state.totalQuantity--;
            state.changed = true;
            if (itemData && itemData.quantity === 1) {
                const index = state.items.findIndex(item => item.id === newItem.id);
                state.items.splice(index, 1);
                itemData.totalPrice = itemData.totalPrice - newItem.price;
            } else {
                itemData.quantity--;
                itemData.totalPrice = itemData.totalPrice - newItem.price;
            }
            localStorage.setItem('cart', JSON.stringify(state))
        }
    }

});

export const cartActions = cartSlice.actions;
export default cartSlice;