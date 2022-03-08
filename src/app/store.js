import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/Auth/userSlice'
import cardReducer from '../features/Cart/cartSlice'

const rootReducer = {
  user: userReducer,
  cart: cardReducer,
}

export const store = configureStore({
  reducer: rootReducer,
})
