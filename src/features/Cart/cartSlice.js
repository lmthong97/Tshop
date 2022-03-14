import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
    orderList: {},
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true
    },
    hideMiniCart(state) {
      state.showMiniCart = false
    },
    addToCart(state, action) {
      // newItem = {id, product, quantity}
      const newItem = action.payload
      const index = state.cartItems.findIndex((x) => x.id === newItem.id)
      if (index >= 0) {
        // increase quantity
        state.cartItems[index].quantity += newItem.quantity
      } else {
        // add to cart
        state.cartItems.push(newItem)
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload
      // check if product is available in cart
      const index = state.cartItems.findIndex((x) => x.id === id)
      if (index >= 0) {
        state.cartItems[index].quantity = quantity
      }
    },
    removeFromCart(state, action) {
      const idNeedToRemove = action.payload

      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedToRemove)
    },
    setOrderList(state, action) {
      state.orderList = action.payload
    },
    checkoutOrder(state, action) {
      state.orderList = {}
    },
  },
})

const { actions, reducer } = cartSlice
export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  removeFromCart,
  setQuantity,
  setOrderList,
  checkoutOrder,
} = actions

export default reducer
