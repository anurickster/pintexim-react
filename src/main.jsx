import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GlobalStyle } from './styles/GlobalStyle.js'
import RootLayout from './routes/RootLayout.jsx'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Products from './routes/Products.jsx'
import Contact from './routes/Contact.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about-us', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'contact-us', element: <Contact /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </StrictMode>
)
