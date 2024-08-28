import React from "react";
import {createBrowserRouter, RouterProvider, Link} from "react-router-dom"
import ChatList from "./components/chatList/ChatList"


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChatList></ChatList>
    ),
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
