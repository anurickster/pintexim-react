import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'pintexim_cart_v1'

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : undefined
  } catch {
    return undefined
  }
}

export const initialState = {
  items: [], // {id, name, price, image, qty}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateFromStorage(state) {
      const stored = readCartFromStorage()
      if (stored && Array.isArray(stored.items)) {
        state.items = stored.items
      }
    },
    addItem(state, action) {
      const item = action.payload
      const existing = state.items.find((it) => it.id === item.id)
      if (existing) {
        existing.qty += item.qty || 1
      } else {
        state.items.push({ ...item, qty: item.qty || 1 })
      }
    },
    removeItem(state, action) {
      const id = action.payload
      state.items = state.items.filter((it) => it.id !== id)
    },
    updateQty(state, action) {
      const { id, qty } = action.payload
      const item = state.items.find((it) => it.id === id)
      if (item) {
        item.qty = Math.max(1, qty)
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { hydrateFromStorage, addItem, removeItem, updateQty, clearCart } = cartSlice.actions
export default cartSlice.reducer

export function persistCartMiddleware(storeApi) {
  return (next) => (action) => {
    const result = next(action)
    try {
      if (typeof action.type === 'string' && action.type.startsWith('cart/')) {
        const state = storeApi.getState()
        const toSave = { items: state.cart?.items || [] }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
      }
    } catch {}
    return result
  }
}


