"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Eye, Copy, Code2, BrainCircuit, Layers } from "lucide-react";
import { toast } from "sonner";
import type { HeroData, Project, SkillGroup, Experience, ContactLink } from "@/types/index";

interface Props {
  data: {
    hero: HeroData;
    projects: Project[];
    skillGroups: SkillGroup[];
    experience: Experience[];
    contact: ContactLink[];
  };
}

export default function PortfolioClient({ data }: Props) {
  const { hero, projects, skillGroups, experience, contact } = data;
  const [activeTab, setActiveTab] = useState("All");

  const filterProjects = () => {
    if (activeTab === "All") return projects;
    if (activeTab === "Web Dev") return projects.filter(p => p.category === "web");
    if (activeTab === "AI / ML") return projects.filter(p => p.category === "ai");
    if (activeTab === "Web + AI") return projects.filter(p => p.category === "combo");
    return projects;
  };

  const ctaCopyEmail = () => {
    navigator.clipboard.writeText(hero.email);
    toast.success("Email copied to clipboard!");
  };

  return (
    <div className="max-w-[800px] mx-auto min-h-screen relative pb-10">
      {/* Floating Nav */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sticky top-4 z-50 flex justify-center px-4"
      >
        <div className="bg-[#1C1C1E] rounded-full p-2 pl-5 flex items-center gap-2 shadow-2xl">
          <a href="#" className="text-xs text-white/55 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition">Home</a>
          <div className="w-[3px] h-[3px] rounded-full bg-white/20"></div>
          <a href="#projects" className="text-xs text-white/55 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition">Projects</a>
          <div className="w-[3px] h-[3px] rounded-full bg-white/20"></div>
          <a href="#skills" className="text-xs text-white/55 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition">Skills</a>
          <div className="w-[3px] h-[3px] rounded-full bg-white/20"></div>
          <a href="#experience" className="text-xs text-white/55 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition">Experience</a>
          <div className="w-[3px] h-[3px] rounded-full bg-white/20"></div>
          <a href="#contact" className="text-xs text-white/55 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition">Contact</a>
          <a href={hero.cv_url} target="_blank" className="bg-white/10 text-white text-[11px] px-3.5 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition ml-2">Resume</a>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="text-center pt-[70px] pb-10 px-6 max-w-[640px] mx-auto overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-[26px] text-gray-900 leading-relaxed mb-2 flex items-center justify-center gap-2 flex-wrap">
            Hello, I'm <span className="font-semibold">{hero.name}</span>
            <div className="w-9 h-9 rounded-full bg-blue-200 border-2 border-blue-300 flex items-center justify-center text-xs justify-center font-bold text-blue-800 overflow-hidden shrink-0">
              {hero.photo_url ? <img src={hero.photo_url} alt="Profile" className="w-full h-full object-cover" /> : "BP"}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="text-[20px] text-gray-500 flex items-center justify-center gap-2.5 flex-wrap mb-1">
            {hero.role1} &amp;
            <div className="bg-[#1C1C1E] text-white text-[13px] font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <div className="w-[7px] h-[7px] rounded-full bg-[#378ADD]"></div>{hero.role2}
            </div>
          </div>
          <div className="text-[18px] text-gray-500 flex items-center justify-center gap-2.5 flex-wrap mt-1">
            Building intelligent
            <div className="bg-white border border-gray-200 text-gray-900 text-[12px] font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <div className="w-[7px] h-[7px] rounded-full bg-[#5DCAA5]"></div>Web Applications
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="text-[14px] text-gray-500 max-w-[500px] mx-auto mt-5 leading-relaxed">
            {hero.description}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex gap-2 justify-center mt-6 z-10 relative">
          <a href="#projects" className="bg-[#1C1C1E] text-white text-xs px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-black transition">
            <Eye size={14} /> View Projects
          </a>
          <button onClick={ctaCopyEmail} className="bg-white text-[#1C1C1E] border border-gray-300 text-xs px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-gray-50 transition cursor-pointer">
            <Copy size={14} /> Copy Email
          </button>
        </motion.div>
      </div>

      {/* Marquee */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="overflow-hidden border-y border-black/10 py-3 mt-4 bg-white/70">
        <div className="marquee-track flex gap-7 w-max">
          {[1, 2].map((i) => (
             <div key={i} className="flex gap-7">
               {["Next.js", "React", "Machine Learning", "TypeScript", "Python", "LangChain", "FastAPI", "PyTorch", "HuggingFace", "Tailwind CSS"].map((skill, j) => (
                 <span key={j} className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-2">
                   <span className="text-[#378ADD] text-lg leading-none mt-[-2px]">·</span> {skill}
                 </span>
               ))}
             </div>
          ))}
        </div>
      </motion.div>

      {/* Projects */}
      <div id="projects" className="py-10 px-7 scroll-mt-20">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] text-[#378ADD] font-medium tracking-widest uppercase">Projects</span>
          <div className="flex gap-1">
            {["All", "Web Dev", "AI / ML", "Web + AI"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] px-3 py-1 rounded-full border transition ${activeTab === tab ? "bg-[#1C1C1E] text-white border-transparent" : "bg-white/80 text-gray-500 border-black/10 hover:bg-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {projects.filter(p => activeTab === "All" || (activeTab === "Web Dev" ? p.category === "web" : activeTab === "AI / ML" ? p.category === "ai" : p.category === "combo")).map((p) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={p.id} 
                className="bg-white rounded-2xl overflow-hidden border border-black/10 shadow-sm hover:shadow-md transition"
              >
                <div className={`h-[72px] flex items-center justify-center ${p.category === 'web' ? 'bg-[#F5F5F5] text-gray-500' : p.category === 'ai' ? 'bg-[#E6F1FB] text-[#378ADD]' : 'bg-[#EAF3DE] text-[#3B6D11]'}`}>
                  {p.category === 'web' && <Code2 size={28} strokeWidth={1.5} />}
                  {p.category === 'ai' && <BrainCircuit size={28} strokeWidth={1.5} />}
                  {p.category === 'combo' && <Layers size={28} strokeWidth={1.5} />}
                </div>
                <div className="p-3">
                  <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block mb-1.5 ${p.category === 'web' ? 'bg-[#F0F0F0] text-gray-600' : p.category === 'ai' ? 'bg-[#E6F1FB] text-[#185FA5]' : 'bg-[#EAF3DE] text-[#3B6D11]'}`}>
                    {p.category === 'web' ? 'Web Dev' : p.category === 'ai' ? 'AI / ML' : 'Web + AI'}
                  </div>
                  <div className="text-xs font-semibold text-gray-900">{p.name}</div>
                  <div className="text-[11px] text-gray-400 mt-1 leading-relaxed line-clamp-2">{p.description}</div>
                  {(p.github_url || p.demo_url) && (
                    <div className="flex gap-2 mt-4 pt-3 border-t border-black/5">
                      {p.github_url && (
                        <a 
                          href={p.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-1.5 rounded-lg bg-[#1C1C1E] text-white hover:bg-black transition shadow-sm"
                        >
                          <Github size={12} strokeWidth={2.5} />
                          GitHub
                        </a>
                      )}
                      {p.demo_url && (
                        <a 
                          href={p.demo_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-1.5 rounded-lg bg-white border border-black/10 text-gray-700 hover:bg-gray-50 transition shadow-sm"
                        >
                          <ExternalLink size={12} strokeWidth={2.5} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <hr className="border-t border-black/10 mx-7" />

      {/* Skills */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} id="skills" className="py-10 px-7 scroll-mt-20">
        <div className="mb-4"><span className="text-[11px] text-[#378ADD] font-medium tracking-widest uppercase">Skills</span></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {skillGroups.map((g, i) => (
            <div key={g.id} className="bg-white rounded-[14px] p-4 border border-black/10 shadow-sm">
              <div className="text-[11px] font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-[#378ADD]' : i % 3 === 1 ? 'bg-[#5DCAA5]' : 'bg-[#7F77DD]'}`}></div>
                {g.name}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.skills?.map(s => (
                  <div key={s.id} className="text-[10px] bg-[#F5F5F5] text-gray-600 px-2.5 py-1 rounded-full">{s.name}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <hr className="border-t border-black/10 mx-7" />

      {/* Experience */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} id="experience" className="py-10 px-7 scroll-mt-20">
        <div className="mb-4"><span className="text-[11px] text-[#378ADD] font-medium tracking-widest uppercase">Experience & Education</span></div>
        <div className="flex flex-col">
          {experience.map((item, i) => (
            <div key={item.id} className={`flex gap-3.5 ${i !== experience.length - 1 ? 'pb-6' : ''}`}>
              <div className="flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${item.type === 'work' ? 'bg-[#378ADD]' : 'bg-[#5DCAA5]'}`}></div>
                {i !== experience.length - 1 && <div className="w-[1px] flex-1 bg-black/10 mt-1.5"></div>}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900">{item.title}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{item.subtitle}</div>
                <div className={`text-[10px] inline-block mt-1 px-2 py-0.5 rounded-full ${item.type === 'work' ? 'bg-[#E6F1FB] text-[#378ADD]' : 'bg-[#EAF3DE] text-[#3B6D11]'}`}>{item.date_range}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <hr className="border-t border-black/10 mx-7" />

      {/* Contact */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} id="contact" className="py-10 px-7 pb-12 scroll-mt-20">
        <div className="mb-2"><span className="text-[11px] text-[#378ADD] font-medium tracking-widest uppercase">Contact</span></div>
        <div className="text-[13px] text-gray-500 mb-5">Let's connect and build something great together.</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {contact.map((c) => {
            const platform = c.platform.toLowerCase();
            let IconComponent = Mail;
            if (platform.includes('github')) IconComponent = Github;
            if (platform.includes('linkedin')) IconComponent = Linkedin;
            if (platform.includes('twitter') || platform.includes(' x')) IconComponent = Twitter;

            return (
              <a href={c.url} target="_blank" rel="noopener noreferrer" key={c.id} className="bg-white border border-black/10 rounded-[14px] p-3.5 flex items-center gap-3 shadow-sm hover:shadow-md transition group">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${platform.includes('linkedin') || platform.includes('twitter') ? 'bg-[#E6F1FB] text-[#378ADD]' : platform.includes('github') ? 'bg-[#F0F0F0] text-gray-900' : 'bg-[#EAF3DE] text-[#3B6D11]'}`}>
                  <IconComponent size={18} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-900">{c.platform}</div>
                  <div className="text-[11px] text-gray-400">{c.handle}</div>
                </div>
                <ExternalLink size={12} className="text-gray-300 group-hover:text-gray-500 transition" />
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-center p-4 text-[11px] text-gray-400 border-t border-black/10 bg-white/60">
        © 2026 <span className="text-[#378ADD]">{hero.name || 'Bagas Prasetyo'}</span> · Built with <span className="text-[#378ADD]">Next.js</span> · Deployed on <span className="text-[#378ADD]">Vercel</span>
      </div>
    </div>
  );
}
