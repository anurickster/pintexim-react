import { createSlice, nanoid } from '@reduxjs/toolkit'

const STORAGE_KEY = 'pintexim_addresses_v1'

function readFromStorage() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : undefined } catch { return undefined }
}

export const initialState = {
  addresses: [], // {id, name, phone, line1, line2, city, state, zip, save}
  selectedId: null,
}

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    hydrate(state) {
      const data = readFromStorage()
      if (data) {
        state.addresses = Array.isArray(data.addresses) ? data.addresses : []
        state.selectedId = data.selectedId || null
      }
    },
    addAddress: {
      reducer(state, action) {
        state.addresses.push(action.payload)
        state.selectedId = action.payload.id
      },
      prepare(addr) {
        return { payload: { id: nanoid(), ...addr } }
      },
    },
    updateAddress(state, action) {
      const { id, changes } = action.payload
      const i = state.addresses.findIndex((a) => a.id === id)
      if (i >= 0) state.addresses[i] = { ...state.addresses[i], ...changes }
    },
    deleteAddress(state, action) {
      const id = action.payload
      state.addresses = state.addresses.filter((a) => a.id !== id)
      if (state.selectedId === id) state.selectedId = state.addresses[0]?.id || null
    },
    selectAddress(state, action) {
      state.selectedId = action.payload
    },
  },
})

export const { hydrate, addAddress, updateAddress, deleteAddress, selectAddress } = addressesSlice.actions
export default addressesSlice.reducer

export function persistAddressesMiddleware(storeApi) {
  return (next) => (action) => {
    const result = next(action)
    try {
      if (typeof action.type === 'string' && action.type.startsWith('addresses/')) {
        const s = storeApi.getState()
        const toSave = {
          addresses: s.addresses?.addresses || [],
          selectedId: s.addresses?.selectedId || null,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
      }
    } catch {}
    return result
  }
}


