"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, experience: 0, contact: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then(r => r.json()),
      fetch("/api/skills").then(r => r.json()),
      fetch("/api/experience").then(r => r.json()),
      fetch("/api/contact").then(r => r.json())
    ]).then(([proj, skills, exp, cont]) => {
      setStats({
        projects: proj.length || 0,
        skills: skills.reduce((acc: number, g: any) => acc + (g.skills?.length || 0), 0) || 0,
        experience: exp.length || 0,
        contact: cont.length || 0
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Selamat datang kembali, Bagas 👋</h1>
      <p className="text-gray-500 text-sm mb-8">Berikut adalah ringkasan data portofolio kamu.</p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Projects", value: stats.projects },
          { label: "Skills", value: stats.skills },
          { label: "Experience", value: stats.experience },
          { label: "Contacts", value: stats.contact },
        ].map(s => (
          <div key={s.label} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-semibold text-gray-900">{loading ? "..." : s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { title: "Hero Section", desc: "Ubah foto, nama & bio utama", icon: "👤", href: "/admin/hero" },
          { title: "Projects", desc: "Kelola portofolio karya", icon: "🚀", href: "/admin/projects" },
          { title: "Skills", desc: "Atur kelompok & item skill", icon: "⚡", href: "/admin/skills" },
          { title: "Experience", desc: "Riwayat kerja & pendidikan", icon: "🎓", href: "/admin/experience" },
          { title: "Contact", desc: "Tautan sosial media & email", icon: "✉️", href: "/admin/contact" },
        ].map(item => (
          <Link key={item.title} href={item.href} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300 transition flex items-start gap-3">
            <div className="text-2xl">{item.icon}</div>
            <div>
              <div className="text-sm font-medium text-gray-900">{item.title}</div>
              <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
