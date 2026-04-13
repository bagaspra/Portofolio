"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    
    const res = await signIn("credentials", {
      username,
      password,
      redirectTo: "/admin",
    })
    
    if ((res as any)?.error) {
      alert("Login Failed")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#EFEFEB] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/10 w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-6 text-center text-gray-900">Portfolio Admin</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700">Username</label>
            <input name="username" type="text" required className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm focus:border-[#378ADD] outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700">Password</label>
            <input name="password" type="password" required className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm focus:border-[#378ADD] outline-none" />
          </div>
          <button disabled={loading} type="submit" className="w-full bg-[#1C1C1E] text-white rounded-lg p-2.5 text-sm font-medium hover:bg-black mt-2">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
