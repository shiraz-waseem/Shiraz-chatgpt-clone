import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import HomePage from "./routes/homePage/Homepage"
import DashboardPage from "./routes/dashboardPage/DashboardPage"
import ChatPage from "./routes/chatPage/ChatPage";
import RootLayout from "./layouts/rootLayout/RootLayout";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";
import SignInPage from "./routes/signInPage/signInPage";
import SignUpPage from "./routes/signUpPage/signUpPage";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
      
  //       <HomePage></HomePage>
     
  //   ),
  // },
  {
     
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <HomePage></HomePage>
        ),
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
            {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          },
        ]
      }
    ]

  },

])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
