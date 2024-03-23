import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom"
import AdminAddProduct from "./admin/pages/AdminAddProduct"
import Dashboard from "./admin/dashboard"
import AdminHome from "./admin/pages/AdminHome"
import AdminProducts from "./admin/pages/AdminProducts"
import SignUp from "./admin/pages/SignUp"
import SignIn from "./admin/pages/SignIn"
import useStore from "./services/useStore"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import UserSignUp from "./pages/UserSignUp"
import UserSignIn from "./pages/UserSignIn"
import PlaceOrder from "./pages/PlaceOrder"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import OrderSuccess from "./pages/OrderSuccess"
import ProductList from "./components/ProductList"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./services/axiosInstance"
import Orders from "./pages/Orders"
import ReviewStar from "./pages/ReviewStar"
import AdminOrders from "./admin/pages/AdminOrders"


function App() {
  const {admin, user} = useStore()
  console.log(user)
//   const {data: orderData} = useQuery({
//     queryKey: ["getorder"],
//     queryFn: () => axiosInstance.get("/api/order/check-out").then(res => res.data.order),
// });
const {data: cartsData} = useQuery({
  queryKey: ["getcart"],
  queryFn: () => axiosInstance.get("/api/products/cart").then((res) => res.data.products),
  enabled: user || admin ? true : false,
});
console.log(cartsData)
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Dashboard/>,
    children: [
      {
        index: true,
        element: <AdminHome/>
      },
      {
        path: "/admin/products",
        element: <AdminProducts/>
      },
      {
        path: "/admin/orders",
        element: <AdminOrders/>
      },
      {
        path: "/admin/addproduct",
        element: <AdminAddProduct/>
      }
    ]
  },
  {
    path: "/admin/signup",
    element: !admin ? <SignUp/> : <Navigate to="/admin" />
  },
  {
    path: "/admin/signin",
    element: !admin ? <SignIn/> : <Navigate to="/admin" />
  },
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        index: true,
        element: <ProductList/>
      },
      {
        path: "/product/:id/:name",
        element: <ProductDetails/>
      },
    ]
  },

  {
    element: <ProtectedRoutes/>,
    children: [
      {
        path: "/product/cart/:id",
        element: <Cart/>,
      },
      {
        path: "/product/place-order",
        element: <PlaceOrder/>
      },
      {
        path: "/order-success",
        element: !cartsData?.items?.length ? <Navigate to="/"/> : <OrderSuccess/>
       
      },
      {
        path: "/orders",
        element: <Orders/>
       
      },
      {
        path: "/review/:orderId",
        element: <ReviewStar/>
       
      }
    ]
  },
  
  {
    path: "/product/placeorder",
    element: <PlaceOrder/>
  },
  {
    path: "/user/auth/signup",
    element: !user ? <UserSignUp/> : <Navigate to={user.name === 'admin' ? '/admin' : '/'} />
  },
  {
    path: "/user/auth/signin",
    element: !user ? <UserSignIn/> : <Navigate to={user.name === 'admin' ? '/admin' : '/'} />
  },
])
  return (
   <RouterProvider router={router} />
  )
}

export default App
