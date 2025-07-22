// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import AppRoute from './router.tsx'
// import { AuthContextProvider } from './context/AuthContext.tsx'
// import { BrowserRouter } from 'react-router-dom'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AuthContextProvider>
//           <AppRoute />
//       </AuthContextProvider>
//     </BrowserRouter>
//   </StrictMode>
// );

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoute from './router.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'   
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartProvider> 
          <Toaster position="top-right" reverseOrder={false} />                  
          <AppRoute />
        </CartProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
