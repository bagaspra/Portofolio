"use client"

import { useEffect, useState } from "react"
import type { ContactLink } from "@/types/index"

export default function ContactAdminPage() {
  const [data, setData] = useState<ContactLink[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<ContactLink> | null>(null)

  const fetchData = () => {
    fetch("/api/contact").then(r => r.json()).then(res => {
      setData(res)
      setLoading(false)
    })
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus contact link ini?")) return
    await fetch(`/api/contact/${id}`, { method: "DELETE" })
    fetchData()
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editing?.id ? "PUT" : "POST"
    const url = editing?.id ? `/api/contact/${editing.id}` : "/api/contact"
    await fetch(url, {
      method,
      body: JSON.stringify(editing),
      headers: { "Content-Type": "application/json" }
    })
    setIsOpen(false)
    fetchData()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Contact Links ({data.length})</h1>
        <button onClick={() => { setEditing({}); setIsOpen(true) }} className="bg-[#1C1C1E] text-white px-4 py-2 rounded-lg text-sm hover:bg-black">+ Tambah Contact</button>
      </div>

      <div className="flex flex-col gap-3">
        {data.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl">{item.icon}</div>
              <div>
                <div className="font-medium text-sm text-gray-900">{item.platform}</div>
                <div className="text-xs text-gray-500">{item.handle}</div>
                <div className="text-[10px] text-gray-400 mt-0.5 truncate max-w-xs">{item.url}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(item); setIsOpen(true) }} className="text-xs text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-xs text-red-600 hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{editing?.id ? "Edit" : "Tambah"} Contact Link</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">Platform</label>
                <input required value={editing?.platform || ''} onChange={e => setEditing((p: any) => ({...p, platform: e.target.value}))} placeholder="Misal: LinkedIn" className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Handle / Username</label>
                <input value={editing?.handle || ''} onChange={e => setEditing((p: any) => ({...p, handle: e.target.value}))} placeholder="@bagasprasetyo" className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">URL Lengkap</label>
                <input required type="url" value={editing?.url || ''} onChange={e => setEditing((p: any) => ({...p, url: e.target.value}))} placeholder="https://..." className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700">Emoji (Icon Utama)</label>
                  <input value={editing?.icon || ''} onChange={e => setEditing((p: any) => ({...p, icon: e.target.value}))} placeholder="💼/🐙/𝕏/✉️" className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Urutan (Sort)</label>
                  <input type="number" value={editing?.sort_order || 0} onChange={e => setEditing((p: any) => ({...p, sort_order: parseInt(e.target.value)}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Batal</button>
                <button type="submit" className="bg-[#1C1C1E] text-white px-4 py-2 rounded-lg text-sm hover:bg-black">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
