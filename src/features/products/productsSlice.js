import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productSources } from './sources'
import { fetchJsonFromDrive } from './drive'

// Fetch a single category by key (e.g., 'cookies', 'ghee', 'honey')
export const fetchCategory = createAsyncThunk(
  'products/fetchCategory',
  async (categoryKey, { rejectWithValue }) => {
    try {
      const srcList = productSources[categoryKey]
      if (!srcList) {
        return rejectWithValue(`Unknown category: ${categoryKey}`)
      }
      let data = null
      let lastError = null
      for (const src of srcList) {
        try {
          if (src.type === 'drive') {
            data = await fetchJsonFromDrive(src.id)
          } else if (src.type === 'local') {
            const res = await fetch(src.path)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            data = await res.json()
          }
          if (data != null) break
        } catch (err) {
          lastError = err
          continue
        }
      }
      if (data == null) {
        throw lastError || new Error('No source succeeded')
      }
      if (!Array.isArray(data)) {
        // If the file returns an object with a field, try common shapes, else pass through
        const maybeArray = data.items || data.data || data.results
        return Array.isArray(maybeArray) ? { categoryKey, items: maybeArray } : { categoryKey, items: data }
      }
      return { categoryKey, items: data }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch category')
    }
  }
)

const initialState = {
  products: {
    cookies: [],
    ghee: [],
    honey: [],
  },
  loading: {
    cookies: false,
    ghee: false,
    honey: false,
  },
  error: {
    cookies: null,
    ghee: null,
    honey: null,
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        const key = action.meta.arg
        if (state.loading[key] !== undefined) state.loading[key] = true
        if (state.error[key] !== undefined) state.error[key] = null
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        const { categoryKey, items } = action.payload
        if (state.products[categoryKey] !== undefined) state.products[categoryKey] = items
        if (state.loading[categoryKey] !== undefined) state.loading[categoryKey] = false
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        const key = action.meta.arg
        if (state.loading[key] !== undefined) state.loading[key] = false
        if (state.error[key] !== undefined) state.error[key] = action.payload || action.error?.message || 'Error'
      })
  },
})

export default productsSlice.reducer


