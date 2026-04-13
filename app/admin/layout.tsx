"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/admin", exact: true },
    { name: "Hero", href: "/admin/hero" },
    { name: "Projects", href: "/admin/projects" },
    { name: "Skills", href: "/admin/skills" },
    { name: "Experience", href: "/admin/experience" },
    { name: "Contact", href: "/admin/contact" },
  ]

  return (
    <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
      <aside className="w-56 bg-[#1C1C1E] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="font-semibold text-sm">Portfolio Admin</div>
          <div className="text-[11px] text-white/50 mt-0.5">Bagas Prasetyo</div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {links.map((link) => {
            const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href)
            return (
              <Link key={link.name} href={link.href} className={`px-3 py-2 rounded-lg text-xs font-medium transition ${isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                {link.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <Link href="/" target="_blank" className="text-xs text-white/60 hover:text-white flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5">
            ↗ Lihat Portofolio
          </Link>
          <button onClick={() => signOut()} className="text-xs text-white/60 hover:text-white flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-white/5">
            ← Keluar
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto text-gray-900">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
