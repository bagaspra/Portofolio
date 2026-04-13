"use client"

import { useEffect, useState } from "react"
import type { Project } from "@/types/index"

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<Project> | null>(null)

  const fetchProjects = () => {
    fetch("/api/projects").then(r => r.json()).then(data => {
      setProjects(data)
      setLoading(false)
    })
  }

  useEffect(() => { fetchProjects() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus project ini?")) return
    await fetch(`/api/projects/${id}`, { method: "DELETE" })
    fetchProjects()
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editing?.id ? "PUT" : "POST"
    const url = editing?.id ? `/api/projects/${editing.id}` : "/api/projects"
    await fetch(url, {
      method,
      body: JSON.stringify(editing),
      headers: { "Content-Type": "application/json" }
    })
    setIsOpen(false)
    fetchProjects()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects ({projects.length})</h1>
        <button onClick={() => { setEditing({}); setIsOpen(true) }} className="bg-[#1C1C1E] text-white px-4 py-2 rounded-lg text-sm hover:bg-black">+ Tambah Project</button>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl">{p.thumbnail_emoji}</div>
              <div>
                <div className="font-medium text-sm text-gray-900">{p.name} <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full ml-2 text-gray-500">{p.category}</span></div>
                <div className="text-xs text-gray-500 line-clamp-1">{p.description}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(p); setIsOpen(true) }} className="text-xs text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-xs text-red-600 hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-auto">
            <h2 className="text-lg font-semibold mb-4">{editing?.id ? "Edit" : "Tambah"} Project</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">Nama Project</label>
                <input required value={editing?.name || ''} onChange={e => setEditing((p: any) => ({...p, name: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Kategori</label>
                <select value={editing?.category || 'web'} onChange={e => setEditing((p: any) => ({...p, category: e.target.value as any}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]">
                  <option value="web">Web Dev</option>
                  <option value="ai">AI / ML</option>
                  <option value="combo">Web + AI</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700">Emoji / Thumbnail</label>
                  <input value={editing?.thumbnail_emoji || '🌐'} onChange={e => setEditing((p: any) => ({...p, thumbnail_emoji: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Urutan (Sort)</label>
                  <input type="number" value={editing?.sort_order || 0} onChange={e => setEditing((p: any) => ({...p, sort_order: parseInt(e.target.value)}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Deskripsi</label>
                <textarea rows={2} value={editing?.description || ''} onChange={e => setEditing((p: any) => ({...p, description: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">GitHub URL</label>
                <input value={editing?.github_url || ''} onChange={e => setEditing((p: any) => ({...p, github_url: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Live Demo URL</label>
                <input value={editing?.demo_url || ''} onChange={e => setEditing((p: any) => ({...p, demo_url: e.target.value}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#378ADD]" />
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
