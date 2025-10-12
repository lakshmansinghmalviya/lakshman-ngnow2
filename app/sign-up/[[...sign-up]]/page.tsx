"use client"

import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="container py-12 flex justify-center">
      <SignUp
        appearance={{ elements: { card: "shadow-md" } }}
        routing="hash"
        afterSignUpUrl="/user"
      />
    </div>
  )
}


