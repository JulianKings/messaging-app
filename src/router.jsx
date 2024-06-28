import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContent from "./mainContent";
import ErrorPage from "./components/errorPage";
import Index from "./components";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Logout from "./components/logout";
import AddCommunity from "./components/addCommunity";

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <MainContent />,
        errorElement: <ErrorPage />,
        children: [
          {
              errorElement: <ErrorPage />,
              children: [
                  {index: true, element: <Index />},
                  {
                    path: '/add_community',
                    element: <AddCommunity />
                  }
              ]
          }
        ]
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/logout",
        element: <Logout />
      }
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;