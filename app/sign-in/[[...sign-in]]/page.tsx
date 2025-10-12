"use client"

import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="container py-12 flex justify-center">
      <SignIn
        appearance={{ elements: { card: "shadow-md" } }}
        routing="hash"
        signUpUrl="/sign-up"
        afterSignInUrl="/user"
      />
    </div>
  )
}


