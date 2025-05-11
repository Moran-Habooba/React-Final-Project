import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainNavbar from "./components/MainNavbar";
import ProductCatalogPage from "./pages/Customers/ProductCatalogPage";
import MyAccountPage from "./pages/Customers/MyAccountPage";
import MyOrdersPage from "./pages/Customers/MyOrdersPage";
import LogoutPage from "./pages/LogoutPage";
import AdminCategoriesPage from "./pages/Admin/AdminCategoriesPage";
import AdminCustomersPage from "./pages/Admin/AdminCustomersPage";
import AdminProductsPage from "./pages/Admin/AdminProductsPage";
import AdminStatisticsPage from "./pages/Admin/AdminStatisticsPage";

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <>
      <br />
      <br />
      <br />
      <MainNavbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/catalog" element={<ProductCatalogPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/account" element={<MyAccountPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/admin/categories"
          element={
            currentUser?.role === "admin" ? (
              <AdminCategoriesPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/customers"
          element={
            currentUser?.role === "admin" ? (
              <AdminCustomersPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            currentUser?.role === "admin" ? (
              <AdminProductsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/statistics"
          element={
            currentUser?.role === "admin" ? (
              <AdminStatisticsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
