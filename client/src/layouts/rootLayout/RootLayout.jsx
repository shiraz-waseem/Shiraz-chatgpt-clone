import React from 'react'
import "./rootLayout.css"
import {Link, Outlet} from "react-router-dom"
import {SignedIn, UserButton } from "@clerk/clerk-react";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to="/" className="logo">
          {/* <img src="/logo.png" alt="" /> */}
          <span>SHIRAZ AI</span>
        </Link>
    <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn>
        </div>
      </header>

    {/* passing all pages */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
