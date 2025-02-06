import App from "@/App";
import HomePage from "@/pages/home/Home";
import LoginPage from "@/pages/login/LoginPage";
import MessagePage from "@/pages/message/MessagePage";
import RegisterPage from "@/pages/register/RegisterPage";
import { createBrowserRouter } from "react-router";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "messages",
        element: <MessagePage />,
      },
    ],
  },
]);

export default routers;
