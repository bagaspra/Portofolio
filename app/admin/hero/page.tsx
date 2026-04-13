"use client"

import { useEffect, useState } from "react"
import type { HeroData } from "@/types/index"

export default function HeroAdminPage() {
  const [hero, setHero] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    fetch("/api/hero").then(r => r.json()).then(data => {
      setHero(data)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch("/api/hero", {
      method: "PUT",
      body: JSON.stringify(hero),
      headers: { "Content-Type": "application/json" }
    })
    setSaving(false)
    if (res.ok) {
      setMsg("✓ Tersimpan!")
      setTimeout(() => setMsg(""), 3000)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Hero Section</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col gap-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700">Nama Lengkap</label>
            <input value={hero?.name || ''} onChange={e => setHero((h: any) => ({...h!, name: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700">Tagline</label>
            <input value={hero?.tagline || ''} onChange={e => setHero((h: any) => ({...h!, tagline: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700">Role 1 (Kiri Badge)</label>
            <input value={hero?.role1 || ''} onChange={e => setHero((h: any) => ({...h!, role1: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700">Role 2 (Kanan Badge)</label>
            <input value={hero?.role2 || ''} onChange={e => setHero((h: any) => ({...h!, role2: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700">Deskripsi</label>
          <textarea rows={3} value={hero?.description || ''} onChange={e => setHero((h: any) => ({...h!, description: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700">Email</label>
          <input type="email" value={hero?.email || ''} onChange={e => setHero((h: any) => ({...h!, email: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700">URL Foto Profil</label>
          <input value={hero?.photo_url || ''} onChange={e => setHero((h: any) => ({...h!, photo_url: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
          {hero?.photo_url && <img src={hero.photo_url} alt="Preview" className="mt-2 w-16 h-16 rounded-full object-cover border border-gray-200" />}
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700">URL CV / Resume</label>
          <input value={hero?.cv_url || ''} onChange={e => setHero((h: any) => ({...h!, cv_url: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <button type="submit" disabled={saving} className="bg-[#1C1C1E] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-black">
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          {msg && <span className="text-green-600 text-sm font-medium">{msg}</span>}
        </div>
      </form>
    </div>
  )
}
