import { Routes, Route } from 'react-router-dom'
import IndexPage from './Views/IndexPage'
import Layout from './layouts/Layout'
import TopPage from './Views/TopPage'
import PinesPage from './Views/PinesPage'
import LlaverosPage from './Views/LlaverosPage'
import AuthSuccess from './Views/AuthSuccess'
import LoginPage from './Views/LoginPage'
import RegistroPage from './Views/RegistroPage'
import ProtectedRoute from './components/ProtectedRoute'
import BlogPage from './Views/BlogPage'
import CompraPage from './Views/CompraPage'
import DetallesPage from './Views/DetallesPage'
import PagoExitoso from './Views/PagoExitoso'
import Dashboard from './Views/admin/Dashboard'
import Productos from './Views/admin/Productos'
import Pedidos from './Views/admin/Pedidos'
import Clientes from './Views/admin/Clientes'
import Analisis from './Views/admin/Analisis'
import AdminWrapper from "./layouts/AdminWrapper";


export default function AppRouter() {
  return (
    <Routes>
  <Route path="/auth/success" element={<AuthSuccess />} />
  <Route path="/Login" element={<LoginPage />} />
  <Route path="/Registro" element={<RegistroPage />} />

  {/* Publicas sin protección */}
  <Route element={<Layout />}>
    <Route path="/" element={<IndexPage />} index />
    <Route path="/Top" element={<TopPage />} />
    <Route path="/Pines" element={<PinesPage />} />
    <Route path="/Llaveros" element={<LlaverosPage />} />
    <Route path="/Blog" element={<BlogPage />} />
    <Route path="/Compra" element={<CompraPage />} />
    <Route path="/Detalles/:id" element={<DetallesPage />} />
    <Route path="/pago-exitoso" element={<PagoExitoso />} />
    <Route path="/pago-error" element={<PagoExitoso />} />
    <Route path="/pago-pendiente" element={<PagoExitoso />} />
  </Route>

  {/* ADMIN */}
  <Route
    element={
      <ProtectedRoute allowedRoles={["1"]}>
         <AdminWrapper />
      </ProtectedRoute>
    }
  >
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/pedidos" element={<Pedidos />} />
    <Route path="/clientes" element={<Clientes />} />
    <Route path="/analisis" element={<Analisis />} />
  </Route>
</Routes>


  );
}

// import {Routes, Route} from 'react-router-dom'
// import IndexPage from './Views/IndexPage'
// import Layout from './layouts/Layout'
// import TopPage from './Views/TopPage'
// import PinesPage from './Views/PinesPage'
// import LlaverosPage from './Views/LlaverosPage'
// import AuthSuccess from './Views/AuthSuccess'
// import LoginPage from './Views/LoginPage'
// import RegistroPage from './Views/RegistroPage'
// //import CarritoPage from './Views/CarritoPage'
// import ProtectedRoute from './components/ProtectedRoute'
// import BlogPage from './Views/BlogPage'
// import CompraPage from './Views/CompraPage'
// import DetallesPage from './Views/DetallesPage'
// import PagoExitoso from './Views/PagoExitoso'
// import Dashboard from './Views/admin/Dashboard'
// import Productos from './Views/admin/Productos'
// import Pedidos from './Views/admin/Pedidos'
// import Clientes from './Views/admin/Clientes'
// import Analisis from './Views/admin/Analisis'

// export default function AppRouter() {
//   return (
    
//       <Routes>
//         <Route path="/auth/success" element={<AuthSuccess />} />
//         <Route path="/Login" element={ <LoginPage />} />
//         <Route path="/Registro" element={<RegistroPage />} />

//         {/* admin */}
//           <Route>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/productos" element={<Productos />} />
//             <Route path="/pedidos" element={<Pedidos />} /> 
//             <Route path="/clientes" element={<Clientes />} />
//             <Route path="/analisis" element={<Analisis />} /> 
//           </Route>
//         <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
//         {/* public */}
//           <Route path="/" element={<IndexPage /> } index />
//           <Route path="/Top" element={<TopPage />} />
//           <Route path="/Pines" element={<PinesPage />} />
//           <Route path="/Llaveros" element={<LlaverosPage />} />
//           <Route path="/Blog" element={<BlogPage />} />
//           {/* <Route path="/Carrito" element={<CarritoPage />} /> */}
//           <Route path="/Compra" element={<CompraPage />} />
//           <Route path="/Detalles/:id" element={<DetallesPage />} />
//           <Route path="/pago-exitoso" element={<PagoExitoso />} />
//           <Route path="/pago-error" element={<PagoExitoso />} />
//           <Route path="/pago-pendiente" element={<PagoExitoso />} />
//         </Route>
//       </Routes>
//   )
// }