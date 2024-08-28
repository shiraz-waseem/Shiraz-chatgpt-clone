import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import "./signUpPage.css"
const signUpPage = () => {
  return <div className="signInPage">
  <SignUp path="/sign-up" signInUrl="sign-in"/>
  </div>
}

export default signUpPage
