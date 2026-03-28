import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import ProductDetails from "./pages/ProductDetails";
import Playground from "./pages/Playground";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
 import ProtectedAdminRoute from "./components/ProtectedAdminRoute"; 
 import AdminEditProduct from "./pages/AdminEditProduct";
import AdminDeleteProduct from "./pages/AdminDeleteProduct";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
       <Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin-dashboard"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/add-product"
  element={
    <ProtectedAdminRoute>
      <AdminAddProduct />
    </ProtectedAdminRoute>
  }
/>
<Route
  path="/admin/edit-product"
  element={
    <ProtectedAdminRoute>
      <AdminEditProduct />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/delete-product"
  element={
    <ProtectedAdminRoute>
      <AdminDeleteProduct />
    </ProtectedAdminRoute>
  }
/>
        <Route path="/admin-dashboard" element={ <ProtectedAdminRoute> <AdminDashboard /> </ProtectedAdminRoute> } />
        <Route path="/admin-dashboard" element={ <ProtectedAdminRoute> <AdminDashboard /> </ProtectedAdminRoute> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;