"use client"

import { useEffect, useState } from "react"
import type { SkillGroup, Skill } from "@/types/index"

export default function SkillsAdminPage() {
  const [groups, setGroups] = useState<SkillGroup[]>([])
  const [loading, setLoading] = useState(true)

  const [groupModal, setGroupModal] = useState<{ open: boolean, data: Partial<SkillGroup> }>({ open: false, data: {} })
  const [skillModal, setSkillModal] = useState<{ open: boolean, data: Partial<Skill> }>({ open: false, data: {} })

  const fetchSkills = () => {
    fetch("/api/skills").then(r => r.json()).then(res => {
      setGroups(res)
      setLoading(false)
    })
  }

  useEffect(() => { fetchSkills() }, [])

  // Groups
  const saveGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = groupModal.data.id ? "PUT" : "POST"
    const url = groupModal.data.id ? `/api/skills/groups/${groupModal.data.id}` : "/api/skills/groups"
    await fetch(url, { method, body: JSON.stringify(groupModal.data), headers: { "Content-Type": "application/json" } })
    setGroupModal({ open: false, data: {} })
    fetchSkills()
  }
  const deleteGroup = async (id: string) => {
    if (!confirm("Hapus grup dan SEMUA skill di dalamnya?")) return
    await fetch(`/api/skills/groups/${id}`, { method: "DELETE" })
    fetchSkills()
  }

  // Skills
  const saveSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = skillModal.data.id ? "PUT" : "POST"
    const url = skillModal.data.id ? `/api/skills/${skillModal.data.id}` : "/api/skills"
    await fetch(url, { method, body: JSON.stringify(skillModal.data), headers: { "Content-Type": "application/json" } })
    setSkillModal({ open: false, data: {} })
    fetchSkills()
  }
  const deleteSkill = async (id: string) => {
    if (!confirm("Hapus skill ini?")) return
    await fetch(`/api/skills/${id}`, { method: "DELETE" })
    fetchSkills()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Skills ({groups.length} Groups)</h1>
        <button onClick={() => setGroupModal({ open: true, data: {} })} className="bg-[#1C1C1E] text-white px-4 py-2 rounded-lg text-sm hover:bg-black">+ Tambah Grup</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map(group => (
          <div key={group.id} className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{group.icon}</span>
                <span className="font-medium text-gray-900">{group.name}</span>
                <span className="text-xs text-gray-400">({group.skills?.length || 0})</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setGroupModal({ open: true, data: group })} className="text-[10px] text-blue-600 hover:underline">Edit</button>
                <button onClick={() => deleteGroup(group.id)} className="text-[10px] text-red-600 hover:underline">Hapus</button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {group.skills?.map(skill => (
                <div key={skill.id} className="bg-gray-50 text-xs px-2.5 py-1.5 rounded-md flex items-center gap-1.5 border border-gray-100">
                  <span className="text-gray-700">{skill.name}</span>
                  <div className="flex gap-1 ml-1 pl-1.5 border-l border-gray-200">
                    <button onClick={() => setSkillModal({ open: true, data: skill })} className="text-gray-400 hover:text-blue-600">✏</button>
                    <button onClick={() => deleteSkill(skill.id)} className="text-gray-400 hover:text-red-600">✕</button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setSkillModal({ open: true, data: { group_id: group.id } })} className="mt-4 text-xs text-[#378ADD] hover:underline w-full text-left font-medium">
              + Tambah Skill ke Grup
            </button>
          </div>
        ))}
      </div>

      {groupModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">{groupModal.data.id ? "Edit" : "Tambah"} Grup</h2>
            <form onSubmit={saveGroup} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">Nama Grup</label>
                <input required value={groupModal.data.name || ''} onChange={e => setGroupModal((p: any) => ({...p, data: {...p.data, name: e.target.value}}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700">Icon / Emoji</label>
                  <input value={groupModal.data.icon || '⚡'} onChange={e => setGroupModal((p: any) => ({...p, data: {...p.data, icon: e.target.value}}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Urutan</label>
                  <input type="number" value={groupModal.data.sort_order || 0} onChange={e => setGroupModal((p: any) => ({...p, data: {...p.data, sort_order: parseInt(e.target.value)}}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setGroupModal({ open: false, data: {} })} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Batal</button>
                <button type="submit" className="bg-[#1C1C1E] text-white px-4 py-2 rounded-lg text-sm hover:bg-black">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {skillModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">{skillModal.data.id ? "Edit" : "Tambah"} Skill</h2>
            <form onSubmit={saveSkill} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">Nama Skill</label>
                <input required value={skillModal.data.name || ''} onChange={e => setSkillModal((p: any) => ({...p, data: {...p.data, name: e.target.value}}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Urutan di dalam grup</label>
                <input type="number" value={skillModal.data.sort_order || 0} onChange={e => setSkillModal((p: any) => ({...p, data: {...p.data, sort_order: parseInt(e.target.value)}}))} className="w-full mt-1 border border-gray-300 rounded-lg p-2 text-sm outline-none" />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" onClick={() => setSkillModal({ open: false, data: {} })} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Batal</button>
                <button type="submit" className="bg-[#1C1C1E] text-white px-4 py-2 rounded-lg text-sm hover:bg-black">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
