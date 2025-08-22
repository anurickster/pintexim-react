import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/products/productsSlice'
import cartReducer, { persistCartMiddleware } from './features/cart/cartSlice'
import addressesReducer, { persistAddressesMiddleware } from './features/addresses/addressesSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    addresses: addressesReducer,
  },
  middleware: (getDefault) => getDefault().concat(persistCartMiddleware, persistAddressesMiddleware),
})


