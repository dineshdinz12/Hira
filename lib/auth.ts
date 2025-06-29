"use client"

import { useRouter } from "next/navigation"

export function useAuth() {
  const router = useRouter()

  const logout = async () => {
    try {
      // Clear any auth tokens or session data
      localStorage.removeItem("auth_token")
      sessionStorage.removeItem("auth_token")
      
      // Redirect to login page
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return { logout }
} 