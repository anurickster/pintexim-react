import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GlobalStyle } from './styles/GlobalStyle.js'
import { Provider } from 'react-redux'
import { store } from './store'
import { hydrateFromStorage } from './features/cart/cartSlice'
import { hydrate as hydrateAddresses } from './features/addresses/addressesSlice'
import RootLayout from './routes/RootLayout.jsx'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Products from './routes/Products.jsx'
import Contact from './routes/Contact.jsx'
import Cart from './routes/Cart.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about-us', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'cart', element: <Cart /> },
      { path: 'contact-us', element: <Contact /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)

// Hydrate cart from localStorage after store is created
store.dispatch(hydrateFromStorage())
store.dispatch(hydrateAddresses())
