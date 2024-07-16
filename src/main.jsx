import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/pages/home/Home.jsx";
import Cart from "./components/pages/cart/Cart.jsx";
import PlaceOrder from "./components/pages/placeOrder/PlaceOrder.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import { Link } from "react-router-dom";
import Verify from "./components/pages/verify/Verify.jsx";
import MyOrders from "./components/pages/myOrders/MyOrders.jsx";
import ResetPassword from "./components/resetPassword/ResetPassword.jsx";

// toast library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorRoute = (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
      marginTop: "100px",
    }}
  >
    <h2 style={{ color: "var(--titleColor)" }}>
      404 ! page not found, please come back to home page
    </h2>
    <Link style={{ color: "red" }} to="/">
      <h3>Click Here To Go Back !</h3>
    </Link>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: errorRoute,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: errorRoute,
  },
  {
    path: "/order",
    element: <PlaceOrder />,
    errorElement: errorRoute,
  },
  {
    path: "/verify",
    element: <Verify />,
    errorElement: errorRoute,
  },
  {
    path: "/myorders",
    element: <MyOrders />,
    errorElement: errorRoute,
  },
  {
    path: "/user/reset-password/:userId/:token",
    element: <ResetPassword />,
    errorElement: errorRoute,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </StoreContextProvider>
  </React.StrictMode>
);
