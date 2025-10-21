import Home from "./component/home/Home";
import LoginPage from "./component/login/LoginPage";
import Seller from "./component/seller/Seller";
import ProtectedRoute from "./ProtectedRoute";
import Product from "./component/seller/SellerProduct";
import Register from "./component/register/Register";
import Admin from "./component/admin/Admin";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminCategory from "./component/admin/adminCategory/AdminCategory";
import AdminSubCategory from "./component/admin/adminSubCategory/AdminSubCategory";
import AdminSubSubCategory from "./component/admin/adminSubSubCategory/AdminSubSubCategory";
import ViewMore from "./component/viewMore/ViewMore";
import { useEffect, useState } from "react";
import Cart from "./component/cart/Cart";
import PlaceOrder from "./component/placeOrder/PlaceOrder";
import OrderConfirmation from "./component/orderConfirmation/OrderConfirmation";
import OrderHistory from "./component/orderHistory/OrderHistory";
import AdminSubSubSubCategory from "./component/admin/adminSubSubSubCategory/AdminSubSubSubCategory";
import AdminProduct from "./component/admin/adminProduct/AdminProduct";
import BackButton from "../BackButton";

function Ecom() {
  const navigate = useNavigate();
  const [ViewMoreDetails, setViewMoreDetails] = useState([]);

  // Session expiry
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");

      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Session expired. Please log in again.");
        navigate("/ecommerce");
      }
    }, 3600000);

    return () => clearInterval(interval);
  }, [navigate]);

  // Fetch cart count on load

  return (
    <>
      <BackButton />
      <div></div>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/ecommerce/home"
          element={
            <ProtectedRoute
              element={<Home setViewMoreDetails={setViewMoreDetails} />}
              allowedRoles={["customer"]}
            />
          }
        />
        <Route
          path="/ecommerce/home/viewmore"
          element={
            <ProtectedRoute
              element={<ViewMore ViewMoreDetails={ViewMoreDetails} />}
              allowedRoles={["customer"]}
            />
          }
        />
        <Route
          path="/ecommerce/home/place-order"
          element={
            <ProtectedRoute
              element={<PlaceOrder />}
              allowedRoles={["customer"]}
            />
          }
          allowedRoles={["customer"]}
        />
        <Route
          path="/ecommerce/home/order-confirmation/:orderId"
          element={
            <ProtectedRoute
              element={<OrderConfirmation />}
              allowedRoles={["customer", "seller", "admin"]}
            />
          }
        />

        <Route
          path="/ecommerce/home/order-history"
          element={<OrderHistory />}
          allowedRoles={["customer", "seller", "admin"]}
        />
        <Route
          path="/ecommerce/home/cart"
          element={<Cart />}
          allowedRoles={["customer"]}
        />
        <Route
          path="/ecommerce/seller"
          element={
            <ProtectedRoute element={<Seller />} allowedRoles={["seller"]} />
          }
        />
        <Route
          path="/ecommerce/seller/product"
          element={
            <ProtectedRoute element={<Product />} allowedRoles={["seller"]} />
          }
        />
        <Route path="/ecommerce/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route
          path="/ecommerce/admin"
          element={
            <ProtectedRoute element={<Admin />} allowedRoles={["admin"]} />
          }
        />
        <Route
          path="/ecommerce/admin/admincategory"
          element={
            <ProtectedRoute
              element={<AdminCategory />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/ecommerce/admin/adminsubcategory"
          element={
            <ProtectedRoute
              element={<AdminSubCategory />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/ecommerce/admin/adminsubsubcategory"
          element={
            <ProtectedRoute
              element={<AdminSubSubCategory />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/ecommerce/admin/adminsubsubsubcategory"
          element={
            <ProtectedRoute
              element={<AdminSubSubSubCategory />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/ecommerce/admin/adminProduct"
          element={
            <ProtectedRoute
              element={<AdminProduct />}
              allowedRoles={["admin"]}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Ecom;
