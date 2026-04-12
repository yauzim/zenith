import { useState, useEffect, useCallback } from "react";
import { supabase } from "./lib/supabase";

// ─── Icons ───
const Icons = {
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Wallet: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>,
  Book: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Pen: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  Repeat: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  Study: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Fire: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Zap: () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Gift: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
  Lock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Unlock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
  Reset: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
};

// ─── XP Calculator: ¥100 = 10 XP needed ───
const priceToXp = (yen) => Math.max(50, Math.round(yen / 10));

// ─── Database Helpers ───
const db = {
  async getExpenses(uid) { const { data } = await supabase.from("expenses").select("*").eq("user_id", uid).order("date", { ascending: false }); return data || []; },
  async addExpense(uid, e) { const { data } = await supabase.from("expenses").insert({ user_id: uid, name: e.name, amount: e.amount, category: e.category, type: e.type, date: e.date }).select().single(); return data; },
  async deleteExpense(id) { await supabase.from("expenses").delete().eq("id", id); },

  async getTodos(uid) { const { data } = await supabase.from("todos").select("*").eq("user_id", uid).order("created_at", { ascending: false }); return data || []; },
  async addTodo(uid, t) { const { data } = await supabase.from("todos").insert({ user_id: uid, text: t.text, priority: t.priority, done: false }).select().single(); return data; },
  async toggleTodo(id, done) { await supabase.from("todos").update({ done }).eq("id", id); },
  async deleteTodo(id) { await supabase.from("todos").delete().eq("id", id); },

  async getSubscriptions(uid) { const { data } = await supabase.from("subscriptions").select("*").eq("user_id", uid).order("created_at", { ascending: false }); return data || []; },
  async addSubscription(uid, s) { const { data } = await supabase.from("subscriptions").insert({ user_id: uid, name: s.name, amount: s.amount, cycle: s.cycle, next_date: s.nextDate || null, active: true, color: s.color }).select().single(); return data; },
  async toggleSubscription(id, active) { await supabase.from("subscriptions").update({ active }).eq("id", id); },
  async deleteSubscription(id) { await supabase.from("subscriptions").delete().eq("id", id); },

  async getJournal(uid) { const { data } = await supabase.from("journal").select("*").eq("user_id", uid).order("date", { ascending: false }); return data || []; },
  async addJournalEntry(uid, e) { const { data } = await supabase.from("journal").insert({ user_id: uid, date: e.date, mood: e.mood, title: e.title, content: e.content }).select().single(); return data; },
  async deleteJournalEntry(id) { await supabase.from("journal").delete().eq("id", id); },

  async getBooks(uid) { const { data } = await supabase.from("books").select("*").eq("user_id", uid).order("created_at", { ascending: false }); return data || []; },
  async addBook(uid, b) { const { data } = await supabase.from("books").insert({ user_id: uid, title: b.title, author: b.author, total_chapters: b.totalChapters || b.total_chapters || 1, chapters_read: b.chaptersRead || b.chapters_read || 0, status: b.status || "backlog", cover: b.cover || "📗" }).select().single(); return data; },
  async updateBook(id, u) { const m = {}; if (u.chapters_read !== undefined) m.chapters_read = u.chapters_read; if (u.chaptersRead !== undefined) m.chapters_read = u.chaptersRead; if (u.status !== undefined) m.status = u.status; await supabase.from("books").update(m).eq("id", id); },
  async deleteBook(id) { await supabase.from("books").delete().eq("id", id); },

  async getStudySessions(uid) { const { data } = await supabase.from("study_sessions").select("*").eq("user_id", uid); return data || []; },
  async updateStudySession(id, u) { await supabase.from("study_sessions").update(u).eq("id", id); },

  async getProfile(uid) { const { data } = await supabase.from("profiles").select("*").eq("id", uid).single(); return data; },
  async updateProfile(uid, u) { await supabase.from("profiles").update(u).eq("id", uid); },

  // Wishlist (localStorage until you add a Supabase table)
  getWishlist(uid) { try { return JSON.parse(localStorage.getItem(`zenith_wishlist_${uid}`)) || []; } catch { return []; } },
  saveWishlist(uid, list) { localStorage.setItem(`zenith_wishlist_${uid}`, JSON.stringify(list)); },

  // Hard Reset
  async hardReset(uid) {
    await Promise.all([
      supabase.from("expenses").delete().eq("user_id", uid),
      supabase.from("todos").delete().eq("user_id", uid),
      supabase.from("subscriptions").delete().eq("user_id", uid),
      supabase.from("journal").delete().eq("user_id", uid),
      supabase.from("books").delete().eq("user_id", uid),
    ]);
    const { data: s } = await supabase.from("study_sessions").select("id").eq("user_id", uid);
    if (s) for (const x of s) await supabase.from("study_sessions").update({ streak: 0, total_sessions: 0, today_done: false, week_log: [false,false,false,false,false,false,false], last_checkin: null }).eq("id", x.id);
    await supabase.from("profiles").update({ xp: 0, level: 1, streak: 0 }).eq("id", uid);
    localStorage.removeItem(`zenith_wishlist_${uid}`);
  },
};

// ─── Shared Components ───
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (<div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{ background: "var(--card)", borderRadius: 16, padding: 28, minWidth: 340, maxWidth: 440, width: "90%", boxShadow: "0 24px 80px rgba(0,0,0,0.3)", border: "1px solid var(--border)", animation: "modalIn 0.25s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{title}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--textDim)", cursor: "pointer", padding: 4 }}><Icons.X /></button>
      </div>{children}
    </div></div>);
}
function Input({ label, ...p }) { return (<div style={{ marginBottom: 14 }}>{label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--textDim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>}<input {...p} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--inputBg)", color: "var(--text)", fontSize: 14, outline: "none", boxSizing: "border-box", ...p.style }} /></div>); }
function Select({ label, options, ...p }) { return (<div style={{ marginBottom: 14 }}>{label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--textDim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>}<select {...p} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--inputBg)", color: "var(--text)", fontSize: 14, outline: "none", boxSizing: "border-box" }}>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>); }
function Btn({ children, variant = "primary", ...p }) { const bg = variant === "primary" ? "var(--accent)" : variant === "danger" ? "#ef4444" : "var(--cardHover)"; return (<button {...p} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: bg, color: variant === "ghost" ? "var(--text)" : "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.2s", opacity: p.disabled ? 0.5 : 1, ...p.style }}>{children}</button>); }
function ProgressBar({ value, max, color = "var(--accent)", height = 8 }) { const pct = Math.min((value / max) * 100, 100); return (<div style={{ width: "100%", height, background: "var(--border)", borderRadius: height, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: height, transition: "width 0.5s ease" }} /></div>); }
function StreakDots({ weekLog }) { const days = ["M","T","W","T","F","S","S"]; const log = Array.isArray(weekLog) ? weekLog : [false,false,false,false,false,false,false]; return (<div style={{ display: "flex", gap: 6 }}>{log.map((d, i) => (<div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}><div style={{ width: 28, height: 28, borderRadius: "50%", background: d ? "var(--accent)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: d ? "#fff" : "var(--textDim)" }}>{d ? "✓" : ""}</div><span style={{ fontSize: 10, color: "var(--textDim)", fontWeight: 500 }}>{days[i]}</span></div>))}</div>); }

// Delete button with X
function DelBtn({ onClick }) { return (<button onClick={onClick} style={{ background: "none", border: "none", color: "var(--textDim)", cursor: "pointer", padding: 4, opacity: 0.5, transition: "all 0.2s" }} onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.color = "#ef4444"; }} onMouseLeave={e => { e.target.style.opacity = 0.5; e.target.style.color = "var(--textDim)"; }}><Icons.X /></button>); }

// Confirm dialog
function ConfirmDialog({ open, title, message, onConfirm, onCancel, danger }) {
  if (!open) return null;
  return (<div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={onCancel}>
    <div onClick={e => e.stopPropagation()} style={{ background: "var(--card)", borderRadius: 16, padding: 28, maxWidth: 360, width: "90%", border: `1px solid ${danger ? "#ef4444" : "var(--border)"}`, boxShadow: "0 24px 80px rgba(0,0,0,0.4)", animation: "modalIn 0.2s ease" }}>
      <div style={{ fontSize: 36, textAlign: "center", marginBottom: 12 }}>{danger ? "⚠️" : "🗑️"}</div>
      <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: danger ? "#ef4444" : "var(--text)", textAlign: "center" }}>{title}</h3>
      <p style={{ fontSize: 13, color: "var(--textDim)", textAlign: "center", margin: "0 0 20px", lineHeight: 1.5 }}>{message}</p>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onCancel} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid var(--border)", background: "var(--cardHover)", color: "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "#ef4444", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Delete</button>
      </div>
    </div></div>);
}

// Hook for delete confirmations
function useConfirm() {
  const [s, setS] = useState({ open: false, title: "", msg: "", fn: null });
  return {
    ...s,
    ask: (title, msg, fn) => setS({ open: true, title, msg, fn }),
    cancel: () => setS({ open: false, title: "", msg: "", fn: null }),
    exec: () => { if (s.fn) s.fn(); setS({ open: false, title: "", msg: "", fn: null }); },
  };
}

// Hard Reset Modal
function HardResetModal({ open, onClose, onReset }) {
  const [step, setStep] = useState(0);
  const [txt, setTxt] = useState("");
  const [busy, setBusy] = useState(false);
  const close = () => { setStep(0); setTxt(""); onClose(); };
  if (!open) return null;
  return (<div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={close}>
    <div onClick={e => e.stopPropagation()} style={{ background: "var(--card)", borderRadius: 16, padding: 28, maxWidth: 400, width: "90%", border: "1px solid #ef4444", boxShadow: "0 24px 80px rgba(239,68,68,0.15)", animation: "modalIn 0.2s ease" }}>
      {step === 0 ? (<>
        <div style={{ fontSize: 42, textAlign: "center", marginBottom: 12 }}>🚨</div>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: "#ef4444", textAlign: "center" }}>Hard Reset</h3>
        <p style={{ fontSize: 13, color: "var(--textDim)", textAlign: "center", margin: "0 0 6px", lineHeight: 1.6 }}>This will permanently delete ALL your data:</p>
        <p style={{ fontSize: 13, color: "var(--text)", textAlign: "center", margin: "0 0 20px", lineHeight: 1.6 }}>Expenses, Tasks, Subscriptions, Journal, Books, Study progress, XP, Streaks & Wishlist</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={close} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid var(--border)", background: "var(--cardHover)", color: "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "#ef4444", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Continue</button>
        </div>
      </>) : (<>
        <div style={{ fontSize: 42, textAlign: "center", marginBottom: 12 }}>⚠️</div>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: "#ef4444", textAlign: "center" }}>Are you absolutely sure?</h3>
        <p style={{ fontSize: 13, color: "var(--textDim)", textAlign: "center", margin: "0 0 16px" }}>Type <strong style={{ color: "#ef4444" }}>RESET</strong> to confirm:</p>
        <input value={txt} onChange={e => setTxt(e.target.value)} placeholder="Type RESET" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #ef4444", background: "var(--inputBg)", color: "var(--text)", fontSize: 16, fontWeight: 700, outline: "none", boxSizing: "border-box", textAlign: "center", letterSpacing: 4, marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={close} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid var(--border)", background: "var(--cardHover)", color: "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={async () => { setBusy(true); await onReset(); setBusy(false); close(); }} disabled={txt !== "RESET" || busy} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: txt === "RESET" ? "#ef4444" : "var(--border)", color: txt === "RESET" ? "#fff" : "var(--textDim)", fontSize: 14, fontWeight: 700, cursor: txt === "RESET" ? "pointer" : "not-allowed" }}>{busy ? "Resetting..." : "Delete Everything"}</button>
        </div>
      </>)}
    </div></div>);
}

// ─── Dashboard ───
function DashboardPage({ data, profile }) {
  const totalExp = (data.expenses||[]).filter(e=>e.type==="expense").reduce((s,e)=>s+e.amount,0);
  const activeSubs = (data.subscriptions||[]).filter(s=>s.active).reduce((s,x)=>s+x.amount,0);
  const todosLeft = (data.todos||[]).filter(t=>!t.done).length;
  const xpIn = (profile.xp||0) - ((profile.level||1)-1)*300;
  const cards = [
    { label:"Monthly Budget", value:`¥${(profile.monthly_budget||100000).toLocaleString()}`, sub:`¥${((profile.monthly_budget||100000)-totalExp).toLocaleString()} left`, color:"#10b981", icon:"💰" },
    { label:"Expenses", value:`¥${totalExp.toLocaleString()}`, sub:`${(data.expenses||[]).filter(e=>e.type==="expense").length} transactions`, color:"#f59e0b", icon:"📊" },
    { label:"Subscriptions", value:`¥${activeSubs.toLocaleString()}/mo`, sub:`${(data.subscriptions||[]).filter(s=>s.active).length} active`, color:"#8b5cf6", icon:"🔄" },
    { label:"Tasks", value:`${todosLeft} pending`, sub:`${(data.todos||[]).filter(t=>t.done).length} completed`, color:"#3b82f6", icon:"✅" },
  ];
  return (<div>
    <div style={{ background:"linear-gradient(135deg,#059669,#10b981,#34d399)", borderRadius:20, padding:"24px 28px", marginBottom:24, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-30, right:-20, fontSize:100, opacity:0.1 }}>🔥</div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12, position:"relative" }}>
        <div><div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.8)", textTransform:"uppercase", letterSpacing:1 }}>Level {profile.level||1}</div><div style={{ fontSize:28, fontWeight:800, color:"#fff" }}>{profile.xp||0} XP</div></div>
        <div style={{ textAlign:"right" }}><div style={{ display:"flex", alignItems:"center", gap:6, color:"#fff" }}><Icons.Fire /><span style={{ fontSize:24, fontWeight:800 }}>{profile.streak||0}</span></div><div style={{ fontSize:12, color:"rgba(255,255,255,0.8)" }}>day streak</div></div>
      </div>
      <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:10, height:10, overflow:"hidden" }}><div style={{ width:`${(xpIn/300)*100}%`, height:"100%", background:"#fff", borderRadius:10 }} /></div>
      <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginTop:6, textAlign:"right" }}>{xpIn}/300 XP to Level {(profile.level||1)+1}</div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:24 }}>{cards.map((c,i)=>(<div key={i} style={{ background:"var(--card)", borderRadius:16, padding:"20px 18px", border:"1px solid var(--border)" }}><div style={{ display:"flex", justifyContent:"space-between" }}><div><div style={{ fontSize:12, fontWeight:600, color:"var(--textDim)", textTransform:"uppercase" }}>{c.label}</div><div style={{ fontSize:22, fontWeight:800, color:"var(--text)", marginTop:4 }}>{c.value}</div><div style={{ fontSize:12, color:c.color, fontWeight:600, marginTop:4 }}>{c.sub}</div></div><span style={{ fontSize:28 }}>{c.icon}</span></div></div>))}</div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
      <div style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)" }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:16 }}>📚 Study Progress</h3>
        {(data.studySessions||[]).map(s=>(<div key={s.id} style={{ marginBottom:14 }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>{s.subject==="japanese"?"🇯🇵 Japanese":"🎓 Uni Exam"}</span><span style={{ fontSize:12, color:s.today_done?"#10b981":"var(--textDim)", fontWeight:600 }}>{s.today_done?"✓ Done":"Pending"}</span></div><StreakDots weekLog={s.week_log} /></div>))}
      </div>
      <div style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)" }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:16 }}>📖 Currently Reading</h3>
        {(data.books||[]).filter(b=>b.status==="reading").map(b=>(<div key={b.id} style={{ display:"flex", gap:12, marginBottom:14 }}><span style={{ fontSize:32 }}>{b.cover}</span><div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{b.title}</div><div style={{ fontSize:11, color:"var(--textDim)" }}>{b.author}</div><ProgressBar value={b.chapters_read} max={b.total_chapters} height={5} /><div style={{ fontSize:10, color:"var(--textDim)", marginTop:3 }}>{b.chapters_read}/{b.total_chapters}</div></div></div>))}
        {(data.books||[]).filter(b=>b.status==="reading").length===0 && <div style={{ fontSize:13, color:"var(--textDim)" }}>No books in progress</div>}
      </div>
    </div>
  </div>);
}

// ─── Budget ───
function BudgetPage({ data, userId, refresh, profile, updateProfile }) {
  const [modal, setModal] = useState(false); const [budgetEdit, setBudgetEdit] = useState(false); const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name:"", amount:"", category:"Food", type:"expense", date:new Date().toISOString().split("T")[0] });
  const [newBudget, setNewBudget] = useState(profile.monthly_budget||100000);
  const c = useConfirm();
  const categories = ["Food","Transport","Housing","Entertainment","Shopping","Health","Education","Income","Other"];
  const catColors = { Food:"#f59e0b", Transport:"#3b82f6", Housing:"#8b5cf6", Entertainment:"#ec4899", Shopping:"#f97316", Health:"#10b981", Education:"#6366f1", Income:"#22c55e", Other:"#64748b" };
  const expenses = data.expenses||[]; const totalExp = expenses.filter(e=>e.type==="expense").reduce((s,e)=>s+e.amount,0); const totalInc = expenses.filter(e=>e.type==="income").reduce((s,e)=>s+e.amount,0);
  const budget = profile.monthly_budget||100000; const rem = budget-totalExp;
  const byCat = {}; expenses.filter(e=>e.type==="expense").forEach(e=>{ byCat[e.category]=(byCat[e.category]||0)+e.amount; });
  const handleAdd = async()=>{ if(!form.name||!form.amount) return; setSaving(true); await db.addExpense(userId,{...form,amount:parseInt(form.amount)}); await refresh(); setForm({name:"",amount:"",category:"Food",type:"expense",date:new Date().toISOString().split("T")[0]}); setModal(false); setSaving(false); };
  return (<div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}><div><h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", margin:0 }}>Budget</h2><p style={{ fontSize:13, color:"var(--textDim)", margin:"4px 0 0" }}>Track daily & monthly expenses</p></div><Btn onClick={()=>setModal(true)}><Icons.Plus /> Add Entry</Btn></div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
      <div style={{ background:"var(--card)", borderRadius:16, padding:20, border:"1px solid var(--border)" }}><div style={{ fontSize:12, color:"var(--textDim)", fontWeight:600, textTransform:"uppercase" }}>Income</div><div style={{ fontSize:26, fontWeight:800, color:"#22c55e", marginTop:4 }}>¥{totalInc.toLocaleString()}</div></div>
      <div style={{ background:"var(--card)", borderRadius:16, padding:20, border:"1px solid var(--border)" }}><div style={{ fontSize:12, color:"var(--textDim)", fontWeight:600, textTransform:"uppercase" }}>Expenses</div><div style={{ fontSize:26, fontWeight:800, color:"#f59e0b", marginTop:4 }}>¥{totalExp.toLocaleString()}</div></div>
      <div style={{ background:"var(--card)", borderRadius:16, padding:20, border:"1px solid var(--border)", cursor:"pointer" }} onClick={()=>setBudgetEdit(true)}><div style={{ fontSize:12, color:"var(--textDim)", fontWeight:600, textTransform:"uppercase" }}>Remaining</div><div style={{ fontSize:26, fontWeight:800, color:rem>=0?"#10b981":"#ef4444", marginTop:4 }}>¥{rem.toLocaleString()}</div><ProgressBar value={totalExp} max={budget} color={rem>=0?"#10b981":"#ef4444"} /></div>
    </div>
    {Object.keys(byCat).length > 0 && <div style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)", marginBottom:20 }}><h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginTop:0, marginBottom:16 }}>Spending by Category</h3><div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>{Object.entries(byCat).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>(<div key={cat} style={{ background:"var(--bg)", borderRadius:12, padding:"10px 16px", display:"flex", alignItems:"center", gap:8, border:"1px solid var(--border)" }}><div style={{ width:10, height:10, borderRadius:"50%", background:catColors[cat]||"#64748b" }} /><span style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>{cat}</span><span style={{ fontSize:13, color:"var(--textDim)" }}>¥{amt.toLocaleString()}</span></div>))}</div></div>}
    <div style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)" }}>
      <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginTop:0, marginBottom:16 }}>Transactions</h3>
      {expenses.map(e=>(<div key={e.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}><div style={{ width:36, height:36, borderRadius:10, background:catColors[e.category]||"#64748b", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, fontWeight:700 }}>{e.category[0]}</div><div><div style={{ fontSize:14, fontWeight:600, color:"var(--text)" }}>{e.name}</div><div style={{ fontSize:11, color:"var(--textDim)" }}>{e.date} · {e.category}</div></div></div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}><span style={{ fontSize:16, fontWeight:700, color:e.type==="income"?"#22c55e":"var(--text)" }}>{e.type==="income"?"+":"-"}¥{e.amount.toLocaleString()}</span><DelBtn onClick={()=>c.ask("Delete transaction?",`Remove "${e.name}"? This can't be undone.`, async()=>{await db.deleteExpense(e.id); await refresh();})} /></div>
      </div>))}
      {expenses.length===0 && <div style={{ textAlign:"center", padding:20, color:"var(--textDim)" }}>No transactions yet</div>}
    </div>
    <Modal open={modal} onClose={()=>setModal(false)} title="Add Transaction"><Input label="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Lunch" /><Input label="Amount (¥)" type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} /><Select label="Type" value={form.type} onChange={e=>setForm({...form,type:e.target.value})} options={[{value:"expense",label:"Expense"},{value:"income",label:"Income"}]} /><Select label="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} options={categories.map(c=>({value:c,label:c}))} /><Input label="Date" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /><Btn onClick={handleAdd} disabled={saving} style={{ width:"100%", justifyContent:"center", marginTop:8 }}>{saving?"Saving...":"Add Transaction"}</Btn></Modal>
    <Modal open={budgetEdit} onClose={()=>setBudgetEdit(false)} title="Set Monthly Budget"><Input label="Monthly Budget (¥)" type="number" value={newBudget} onChange={e=>setNewBudget(parseInt(e.target.value)||0)} /><Btn onClick={async()=>{await updateProfile({monthly_budget:newBudget}); setBudgetEdit(false);}} style={{ width:"100%", justifyContent:"center" }}>Save</Btn></Modal>
    <ConfirmDialog open={c.open} title={c.title} message={c.msg} onConfirm={c.exec} onCancel={c.cancel} />
  </div>);
}

// ─── Todos ───
function TodoPage({ data, userId, refresh }) {
  const [modal, setModal] = useState(false); const [text, setText] = useState(""); const [priority, setPriority] = useState("medium"); const [saving, setSaving] = useState(false);
  const c = useConfirm(); const todos = data.todos||[];
  const sorted = [...todos].sort((a,b)=>(a.done-b.done)||({high:0,medium:1,low:2}[a.priority]||1)-({high:0,medium:1,low:2}[b.priority]||1));
  const priColors = { high:"#ef4444", medium:"#f59e0b", low:"#10b981" };
  const handleAdd = async()=>{ if(!text.trim()) return; setSaving(true); await db.addTodo(userId,{text,priority}); await refresh(); setText(""); setModal(false); setSaving(false); };
  return (<div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}><div><h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", margin:0 }}>To-Do List</h2><p style={{ fontSize:13, color:"var(--textDim)", margin:"4px 0 0" }}>{todos.filter(t=>!t.done).length} tasks remaining</p></div><Btn onClick={()=>setModal(true)}><Icons.Plus /> Add Task</Btn></div>
    <div style={{ background:"var(--card)", borderRadius:16, padding:20, border:"1px solid var(--border)", marginBottom:20 }}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>Progress</span><span style={{ fontSize:13, fontWeight:700, color:"var(--accent)" }}>{todos.filter(t=>t.done).length}/{todos.length}</span></div><ProgressBar value={todos.filter(t=>t.done).length} max={Math.max(todos.length,1)} /></div>
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>{sorted.map(t=>(<div key={t.id} style={{ background:"var(--card)", borderRadius:14, padding:"14px 18px", border:"1px solid var(--border)", display:"flex", alignItems:"center", gap:14, opacity:t.done?0.5:1 }}>
      <button onClick={async()=>{await db.toggleTodo(t.id,!t.done); await refresh();}} style={{ width:24, height:24, borderRadius:7, border:`2px solid ${t.done?"var(--accent)":"var(--border)"}`, background:t.done?"var(--accent)":"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{t.done && <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" style={{ width:14, height:14 }}><polyline points="20 6 9 17 4 12"/></svg>}</button>
      <div style={{ flex:1, fontSize:14, fontWeight:600, color:"var(--text)", textDecoration:t.done?"line-through":"none" }}>{t.text}</div>
      <div style={{ width:8, height:8, borderRadius:"50%", background:priColors[t.priority]||"#f59e0b", flexShrink:0 }} />
      <DelBtn onClick={()=>c.ask("Delete task?",`Remove "${t.text}"?`, async()=>{await db.deleteTodo(t.id); await refresh();})} />
    </div>))}{todos.length===0 && <div style={{ textAlign:"center", padding:30, color:"var(--textDim)" }}>No tasks yet</div>}</div>
    <Modal open={modal} onClose={()=>setModal(false)} title="New Task"><Input label="Task" value={text} onChange={e=>setText(e.target.value)} placeholder="What needs to be done?" onKeyDown={e=>e.key==="Enter"&&handleAdd()} /><Select label="Priority" value={priority} onChange={e=>setPriority(e.target.value)} options={[{value:"high",label:"🔴 High"},{value:"medium",label:"🟡 Medium"},{value:"low",label:"🟢 Low"}]} /><Btn onClick={handleAdd} disabled={saving} style={{ width:"100%", justifyContent:"center", marginTop:8 }}>{saving?"Saving...":"Add Task"}</Btn></Modal>
    <ConfirmDialog open={c.open} title={c.title} message={c.msg} onConfirm={c.exec} onCancel={c.cancel} />
  </div>);
}

// ─── Subscriptions ───
function SubscriptionsPage({ data, userId, refresh }) {
  const [modal, setModal] = useState(false); const [form, setForm] = useState({ name:"", amount:"", cycle:"monthly", nextDate:"", color:"#34d399" }); const [saving, setSaving] = useState(false);
  const c = useConfirm(); const subs = data.subscriptions||[];
  const totalMonthly = subs.filter(s=>s.active).reduce((sum,s)=>sum+(s.cycle==="yearly"?Math.round(s.amount/12):s.amount),0);
  const handleAdd = async()=>{ if(!form.name||!form.amount) return; setSaving(true); await db.addSubscription(userId,{...form,amount:parseInt(form.amount)}); await refresh(); setForm({name:"",amount:"",cycle:"monthly",nextDate:"",color:"#34d399"}); setModal(false); setSaving(false); };
  return (<div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}><div><h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", margin:0 }}>Subscriptions</h2><p style={{ fontSize:13, color:"var(--textDim)", margin:"4px 0 0" }}>Manage recurring payments</p></div><Btn onClick={()=>setModal(true)}><Icons.Plus /> Add Sub</Btn></div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:24 }}><div style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)" }}><div style={{ fontSize:12, color:"var(--textDim)", fontWeight:600, textTransform:"uppercase" }}>Monthly Total</div><div style={{ fontSize:28, fontWeight:800, color:"var(--text)", marginTop:4 }}>¥{totalMonthly.toLocaleString()}</div></div><div style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)" }}><div style={{ fontSize:12, color:"var(--textDim)", fontWeight:600, textTransform:"uppercase" }}>Yearly Estimate</div><div style={{ fontSize:28, fontWeight:800, color:"var(--text)", marginTop:4 }}>¥{(totalMonthly*12).toLocaleString()}</div></div></div>
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>{subs.map(s=>(<div key={s.id} style={{ background:"var(--card)", borderRadius:16, padding:"18px 22px", border:"1px solid var(--border)", display:"flex", alignItems:"center", gap:16, opacity:s.active?1:0.45 }}>
      <div style={{ width:42, height:42, borderRadius:12, background:s.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:"#fff" }}>{s.name[0]}</div>
      <div style={{ flex:1 }}><div style={{ fontSize:15, fontWeight:700, color:"var(--text)" }}>{s.name}</div><div style={{ fontSize:12, color:"var(--textDim)" }}>{s.cycle} · next: {s.next_date||"—"}</div></div>
      <div style={{ fontSize:18, fontWeight:800, color:"var(--text)", marginRight:8 }}>¥{s.amount.toLocaleString()}</div>
      <button onClick={async()=>{await db.toggleSubscription(s.id,!s.active); await refresh();}} style={{ padding:"6px 12px", borderRadius:8, border:"1px solid var(--border)", background:s.active?"var(--accent)":"var(--cardHover)", color:s.active?"#fff":"var(--textDim)", fontSize:11, fontWeight:700, cursor:"pointer" }}>{s.active?"Active":"Paused"}</button>
      <DelBtn onClick={()=>c.ask("Delete subscription?",`Remove "${s.name}"?`, async()=>{await db.deleteSubscription(s.id); await refresh();})} />
    </div>))}{subs.length===0 && <div style={{ textAlign:"center", padding:30, color:"var(--textDim)" }}>No subscriptions yet</div>}</div>
    <Modal open={modal} onClose={()=>setModal(false)} title="Add Subscription"><Input label="Service Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Netflix" /><Input label="Amount (¥)" type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} /><Select label="Billing Cycle" value={form.cycle} onChange={e=>setForm({...form,cycle:e.target.value})} options={[{value:"monthly",label:"Monthly"},{value:"yearly",label:"Yearly"}]} /><Input label="Next Billing Date" type="date" value={form.nextDate} onChange={e=>setForm({...form,nextDate:e.target.value})} /><Input label="Brand Color" type="color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} /><Btn onClick={handleAdd} disabled={saving} style={{ width:"100%", justifyContent:"center", marginTop:8 }}>{saving?"Saving...":"Add"}</Btn></Modal>
    <ConfirmDialog open={c.open} title={c.title} message={c.msg} onConfirm={c.exec} onCancel={c.cancel} />
  </div>);
}

// ─── Journal ───
function JournalPage({ data, userId, refresh }) {
  const [modal, setModal] = useState(false); const [form, setForm] = useState({ title:"", content:"", mood:"😊", date:new Date().toISOString().split("T")[0] }); const [saving, setSaving] = useState(false);
  const c = useConfirm(); const moods = ["😊","😌","😐","😢","😤","🤩","😴","🤔"]; const journal = data.journal||[];
  const handleAdd = async()=>{ if(!form.title) return; setSaving(true); await db.addJournalEntry(userId,form); await refresh(); setForm({title:"",content:"",mood:"😊",date:new Date().toISOString().split("T")[0]}); setModal(false); setSaving(false); };
  return (<div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}><div><h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", margin:0 }}>Journal</h2><p style={{ fontSize:13, color:"var(--textDim)", margin:"4px 0 0" }}>Reflect on your day</p></div><Btn onClick={()=>setModal(true)}><Icons.Plus /> New Entry</Btn></div>
    {journal.length > 0 && <div style={{ background:"var(--card)", borderRadius:16, padding:20, border:"1px solid var(--border)", marginBottom:20 }}><h3 style={{ fontSize:14, fontWeight:700, color:"var(--text)", marginTop:0, marginBottom:12 }}>Recent Moods</h3><div style={{ display:"flex", gap:8 }}>{journal.slice(0,7).map((e,i)=>(<div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}><span style={{ fontSize:28 }}>{e.mood}</span><span style={{ fontSize:10, color:"var(--textDim)" }}>{e.date.slice(5)}</span></div>))}</div></div>}
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>{journal.map(e=>(<div key={e.id} style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)", position:"relative" }}>
      <div style={{ position:"absolute", top:14, right:14 }}><DelBtn onClick={()=>c.ask("Delete entry?",`Remove "${e.title}"?`, async()=>{await db.deleteJournalEntry(e.id); await refresh();})} /></div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}><span style={{ fontSize:24 }}>{e.mood}</span><h3 style={{ fontSize:16, fontWeight:700, color:"var(--text)", margin:0 }}>{e.title}</h3></div>
      <div style={{ fontSize:12, color:"var(--textDim)", marginBottom:8 }}>{e.date}</div>
      <p style={{ fontSize:14, color:"var(--textSoft)", lineHeight:1.7, margin:0 }}>{e.content}</p>
    </div>))}{journal.length===0 && <div style={{ textAlign:"center", padding:30, color:"var(--textDim)" }}>No entries yet</div>}</div>
    <Modal open={modal} onClose={()=>setModal(false)} title="New Journal Entry"><Input label="Date" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /><div style={{ marginBottom:14 }}><label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--textDim)", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Mood</label><div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{moods.map(m=>(<button key={m} onClick={()=>setForm({...form,mood:m})} style={{ fontSize:28, padding:4, border:form.mood===m?"2px solid var(--accent)":"2px solid transparent", borderRadius:10, background:form.mood===m?"var(--cardHover)":"transparent", cursor:"pointer" }}>{m}</button>))}</div></div><Input label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="How was your day?" /><div style={{ marginBottom:14 }}><label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--textDim)", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Content</label><textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Write your thoughts..." rows={5} style={{ width:"100%", padding:"10px 14px", borderRadius:10, border:"1px solid var(--border)", background:"var(--inputBg)", color:"var(--text)", fontSize:14, outline:"none", resize:"vertical", boxSizing:"border-box", fontFamily:"inherit" }} /></div><Btn onClick={handleAdd} disabled={saving} style={{ width:"100%", justifyContent:"center", marginTop:8 }}>{saving?"Saving...":"Save Entry"}</Btn></Modal>
    <ConfirmDialog open={c.open} title={c.title} message={c.msg} onConfirm={c.exec} onCancel={c.cancel} />
  </div>);
}

// ─── Books ───
function BooksPage({ data, userId, refresh }) {
  const [modal, setModal] = useState(false); const [tab, setTab] = useState("reading"); const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title:"", author:"", totalChapters:"", chaptersRead:"0", status:"backlog", cover:"📗" });
  const c = useConfirm(); const covers = ["📗","📘","📕","📙","📓","📔","📒"]; const books = data.books||[];
  const tabs = [{key:"reading",label:"Reading",count:books.filter(b=>b.status==="reading").length},{key:"completed",label:"Completed",count:books.filter(b=>b.status==="completed").length},{key:"backlog",label:"Backlog",count:books.filter(b=>b.status==="backlog").length}];
  const recs = [{title:"Thinking, Fast and Slow",author:"Daniel Kahneman",cover:"📘"},{title:"The Art of War",author:"Sun Tzu",cover:"📕"},{title:"Sapiens",author:"Yuval Noah Harari",cover:"📗"},{title:"Norwegian Wood",author:"Haruki Murakami",cover:"📙"}];
  const handleAdd = async()=>{ if(!form.title) return; setSaving(true); await db.addBook(userId,{...form,totalChapters:parseInt(form.totalChapters)||1,chaptersRead:parseInt(form.chaptersRead)||0}); await refresh(); setForm({title:"",author:"",totalChapters:"",chaptersRead:"0",status:"backlog",cover:"📗"}); setModal(false); setSaving(false); };
  const filtered = books.filter(b=>b.status===tab);
  return (<div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}><div><h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", margin:0 }}>Book Shelf</h2><p style={{ fontSize:13, color:"var(--textDim)", margin:"4px 0 0" }}>{books.length} books</p></div><Btn onClick={()=>setModal(true)}><Icons.Plus /> Add Book</Btn></div>
    <div style={{ display:"flex", gap:6, marginBottom:20, background:"var(--card)", borderRadius:12, padding:4, border:"1px solid var(--border)" }}>{tabs.map(t=>(<button key={t.key} onClick={()=>setTab(t.key)} style={{ flex:1, padding:"10px 16px", borderRadius:9, border:"none", background:tab===t.key?"var(--accent)":"transparent", color:tab===t.key?"#fff":"var(--textDim)", fontSize:13, fontWeight:700, cursor:"pointer" }}>{t.label} ({t.count})</button>))}</div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:14, marginBottom:28 }}>{filtered.map(b=>(<div key={b.id} style={{ background:"var(--card)", borderRadius:16, padding:20, border:"1px solid var(--border)", position:"relative" }}>
      <div style={{ position:"absolute", top:10, right:10 }}><DelBtn onClick={()=>c.ask("Delete book?",`Remove "${b.title}"?`, async()=>{await db.deleteBook(b.id); await refresh();})} /></div>
      <div style={{ fontSize:48, marginBottom:10 }}>{b.cover}</div><div style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:2 }}>{b.title}</div><div style={{ fontSize:12, color:"var(--textDim)", marginBottom:12 }}>{b.author}</div>
      {b.status!=="backlog" && <div><ProgressBar value={b.chapters_read} max={b.total_chapters} height={6} color={b.status==="completed"?"#10b981":"var(--accent)"} /><div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:11, color:"var(--textDim)" }}><span>{b.chapters_read}/{b.total_chapters}</span><span>{Math.round((b.chapters_read/b.total_chapters)*100)}%</span></div>
        {b.status==="reading" && <div style={{ display:"flex", gap:6, marginTop:10 }}><button onClick={async()=>{const n=Math.max(0,b.chapters_read-1); await db.updateBook(b.id,{chapters_read:n}); await refresh();}} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"1px solid var(--border)", background:"var(--bg)", color:"var(--textDim)", fontSize:16, cursor:"pointer" }}>−</button><button onClick={async()=>{const n=Math.min(b.total_chapters,b.chapters_read+1); await db.updateBook(b.id,{chapters_read:n,status:n>=b.total_chapters?"completed":"reading"}); await refresh();}} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"none", background:"var(--accent)", color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer" }}>+</button></div>}</div>}
      {b.status==="backlog" && <Btn onClick={async()=>{await db.updateBook(b.id,{status:"reading"}); await refresh();}} variant="ghost" style={{ width:"100%", justifyContent:"center", fontSize:12, padding:"8px 12px", marginTop:4 }}>Start Reading</Btn>}
    </div>))}{filtered.length===0 && <div style={{ gridColumn:"1/-1", textAlign:"center", padding:30, color:"var(--textDim)" }}>No books here</div>}</div>
    <div style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)" }}><h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginTop:0, marginBottom:16 }}>📚 Recommendations</h3><div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12 }}>{recs.map((r,i)=>(<div key={i} style={{ background:"var(--bg)", borderRadius:12, padding:"14px 16px", border:"1px solid var(--border)", display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={async()=>{await db.addBook(userId,{...r,totalChapters:15,chaptersRead:0,status:"backlog"}); await refresh();}}><span style={{ fontSize:28 }}>{r.cover}</span><div><div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{r.title}</div><div style={{ fontSize:11, color:"var(--textDim)" }}>{r.author}</div><div style={{ fontSize:10, color:"var(--accent)", fontWeight:600, marginTop:2 }}>+ Add to backlog</div></div></div>))}</div></div>
    <Modal open={modal} onClose={()=>setModal(false)} title="Add Book"><Input label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /><Input label="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} /><Input label="Total Chapters" type="number" value={form.totalChapters} onChange={e=>setForm({...form,totalChapters:e.target.value})} /><Input label="Chapters Read" type="number" value={form.chaptersRead} onChange={e=>setForm({...form,chaptersRead:e.target.value})} /><Select label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})} options={[{value:"backlog",label:"Backlog"},{value:"reading",label:"Reading"},{value:"completed",label:"Completed"}]} /><div style={{ marginBottom:14 }}><label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--textDim)", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Cover</label><div style={{ display:"flex", gap:8 }}>{covers.map(cv=>(<button key={cv} onClick={()=>setForm({...form,cover:cv})} style={{ fontSize:28, padding:4, border:form.cover===cv?"2px solid var(--accent)":"2px solid transparent", borderRadius:8, background:"transparent", cursor:"pointer" }}>{cv}</button>))}</div></div><Btn onClick={handleAdd} disabled={saving} style={{ width:"100%", justifyContent:"center", marginTop:8 }}>{saving?"Saving...":"Add Book"}</Btn></Modal>
    <ConfirmDialog open={c.open} title={c.title} message={c.msg} onConfirm={c.exec} onCancel={c.cancel} />
  </div>);
}

// ─── Study ───
function StudyPage({ data, userId, refresh, profile, updateProfile }) {
  const subjects = [{key:"japanese",label:"Japanese",emoji:"🇯🇵",color:"#ef4444",desc:"Daily kanji, grammar & vocabulary"},{key:"uni",label:"University Exam",emoji:"🎓",color:"#0d9488",desc:"Exam prep & review"}];
  const sessions = data.studySessions||[]; const totalXP = profile.xp||0;
  const milestones = [{xp:300,label:"Beginner",icon:"🌱"},{xp:900,label:"Consistent",icon:"⚡"},{xp:1500,label:"Dedicated",icon:"🔥"},{xp:3000,label:"Master",icon:"👑"}];
  const checkin = async(key)=>{ const s = sessions.find(x=>x.subject===key); if(!s||s.today_done) return; const wl = [...(Array.isArray(s.week_log)?s.week_log:[false,false,false,false,false,false,false]).slice(1),true]; await db.updateStudySession(s.id,{today_done:true,total_sessions:s.total_sessions+1,streak:s.streak+1,week_log:wl,last_checkin:new Date().toISOString().split("T")[0]}); const nx=totalXP+50; await updateProfile({xp:nx,level:Math.floor(nx/300)+1,streak:Math.max(profile.streak||0,s.streak+1)}); await refresh(); };
  return (<div>
    <h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", margin:"0 0 4px" }}>Study Check-in</h2><p style={{ fontSize:13, color:"var(--textDim)", margin:"0 0 20px" }}>Build your streak & earn XP</p>
    <div style={{ background:"linear-gradient(135deg,#047857,#059669,#10b981)", borderRadius:20, padding:"26px 28px", marginBottom:24, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-20, right:10, fontSize:90, opacity:0.12 }}>🏆</div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative" }}>
        <div><div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>Your Streak</div><div style={{ display:"flex", alignItems:"center", gap:10, marginTop:4 }}><span style={{ fontSize:42, fontWeight:900, color:"#fff" }}>{profile.streak||0}</span><span style={{ fontSize:18, color:"rgba(255,255,255,0.7)" }}>days</span></div><div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginTop:6 }}>{(profile.streak||0)>=7?"🔥 On fire!":(profile.streak||0)>=3?"⚡ Building momentum!":"🌱 Every day counts!"}</div></div>
        <div style={{ textAlign:"center" }}><div style={{ fontSize:42, marginBottom:4 }}>{milestones.filter(m=>totalXP>=m.xp).pop()?.icon||"🌱"}</div><div style={{ fontSize:12, color:"rgba(255,255,255,0.7)", fontWeight:600 }}>{milestones.filter(m=>totalXP>=m.xp).pop()?.label||"Novice"}</div></div>
      </div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>{subjects.map(sub=>{const s = sessions.find(x=>x.subject===sub.key)||{streak:0,total_sessions:0,today_done:false,week_log:[false,false,false,false,false,false,false]}; return (<div key={sub.key} style={{ background:"var(--card)", borderRadius:18, padding:24, border:"1px solid var(--border)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}><span style={{ fontSize:32 }}>{sub.emoji}</span><div><div style={{ fontSize:17, fontWeight:800, color:"var(--text)" }}>{sub.label}</div><div style={{ fontSize:12, color:"var(--textDim)" }}>{sub.desc}</div></div></div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}><div style={{ background:"var(--bg)", borderRadius:10, padding:"10px 14px", border:"1px solid var(--border)" }}><div style={{ fontSize:10, color:"var(--textDim)", fontWeight:600, textTransform:"uppercase" }}>Streak</div><div style={{ fontSize:22, fontWeight:800, color:sub.color }}>{s.streak}</div></div><div style={{ background:"var(--bg)", borderRadius:10, padding:"10px 14px", border:"1px solid var(--border)" }}><div style={{ fontSize:10, color:"var(--textDim)", fontWeight:600, textTransform:"uppercase" }}>Total</div><div style={{ fontSize:22, fontWeight:800, color:"var(--text)" }}>{s.total_sessions}</div></div></div>
      <div style={{ marginBottom:16 }}><div style={{ fontSize:12, fontWeight:600, color:"var(--textDim)", marginBottom:8 }}>This Week</div><StreakDots weekLog={s.week_log} /></div>
      <button disabled={s.today_done} onClick={()=>checkin(sub.key)} style={{ width:"100%", padding:"14px 0", borderRadius:12, border:"none", background:s.today_done?"var(--cardHover)":sub.color, color:s.today_done?"var(--textDim)":"#fff", fontSize:15, fontWeight:800, cursor:s.today_done?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>{s.today_done?"✓ Completed Today!":<><Icons.Zap /> Check In (+50 XP)</>}</button>
    </div>);})}</div>
    <div style={{ background:"var(--card)", borderRadius:16, padding:22, border:"1px solid var(--border)" }}><h3 style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginTop:0, marginBottom:16 }}>🏆 Milestones</h3><div style={{ display:"flex", gap:12 }}>{milestones.map((m,i)=>{const a=totalXP>=m.xp; return (<div key={i} style={{ flex:1, textAlign:"center", padding:16, borderRadius:14, background:a?"var(--accent)":"var(--bg)", border:"1px solid var(--border)", opacity:a?1:0.5 }}><div style={{ fontSize:32, marginBottom:6 }}>{m.icon}</div><div style={{ fontSize:12, fontWeight:700, color:a?"#fff":"var(--textDim)" }}>{m.label}</div><div style={{ fontSize:10, color:a?"rgba(255,255,255,0.7)":"var(--textDim)", marginTop:2 }}>{m.xp} XP</div></div>);})}</div></div>
  </div>);
}

// ─── Wishlist ───
function WishlistPage({ userId, profile }) {
  const [items, setItems] = useState(()=>db.getWishlist(userId));
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", price:"", emoji:"🎮" });
  const c = useConfirm();
  const xp = profile.xp || 0;
  const emojis = ["🎮","🖥️","🎧","📱","⌨️","🎸","📷","👟","🎒","✈️","🍱","☕"];

  const save = (list) => { setItems(list); db.saveWishlist(userId, list); };
  const handleAdd = () => { if(!form.name||!form.price) return; const price = parseInt(form.price); save([...items, { id: Date.now(), name: form.name, price, xpNeeded: priceToXp(price), emoji: form.emoji }]); setForm({ name:"", price:"", emoji:"🎮" }); setModal(false); };
  const handleDelete = (id) => save(items.filter(i=>i.id!==id));
  const handleClaim = (item) => save(items.map(i=>i.id===item.id?{...i,claimed:true}:i));

  const unlocked = items.filter(i=>xp>=i.xpNeeded && !i.claimed);
  const locked = items.filter(i=>xp<i.xpNeeded);
  const claimed = items.filter(i=>i.claimed);

  return (<div>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}><div><h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", margin:0 }}>Wishlist</h2><p style={{ fontSize:13, color:"var(--textDim)", margin:"4px 0 0" }}>Earn XP, unlock rewards</p></div><Btn onClick={()=>setModal(true)}><Icons.Plus /> Add Item</Btn></div>

    <div style={{ background:"linear-gradient(135deg,#059669,#10b981,#34d399)", borderRadius:20, padding:"22px 28px", marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div><div style={{ fontSize:12, color:"rgba(255,255,255,0.7)", fontWeight:600, textTransform:"uppercase" }}>Your XP</div><div style={{ fontSize:32, fontWeight:900, color:"#fff" }}>{xp} XP</div></div>
      <div style={{ textAlign:"right" }}><div style={{ fontSize:12, color:"rgba(255,255,255,0.7)" }}>{unlocked.length} unlocked</div><div style={{ fontSize:12, color:"rgba(255,255,255,0.7)" }}>{locked.length} locked</div></div>
    </div>

    <div style={{ background:"var(--card)", borderRadius:16, padding:"14px 18px", border:"1px solid var(--border)", marginBottom:12, fontSize:13, color:"var(--textDim)" }}>
      💡 XP needed is based on price: ¥1,000 = 100 XP, ¥10,000 = 1,000 XP, ¥50,000 = 5,000 XP
    </div>

    {unlocked.length > 0 && <><h3 style={{ fontSize:15, fontWeight:700, color:"var(--accent)", margin:"20px 0 12px", display:"flex", alignItems:"center", gap:8 }}><Icons.Unlock /> Unlocked — Ready to claim!</h3>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12, marginBottom:20 }}>{unlocked.map(i=>(<div key={i.id} style={{ background:"var(--card)", borderRadius:16, padding:20, border:"2px solid var(--accent)", position:"relative" }}>
      <div style={{ position:"absolute", top:10, right:10 }}><DelBtn onClick={()=>c.ask("Remove item?",`Remove "${i.name}"?`,()=>handleDelete(i.id))} /></div>
      <div style={{ fontSize:40, marginBottom:8 }}>{i.emoji}</div><div style={{ fontSize:15, fontWeight:700, color:"var(--text)" }}>{i.name}</div><div style={{ fontSize:13, color:"var(--accent)", fontWeight:600 }}>¥{i.price.toLocaleString()}</div>
      <div style={{ fontSize:11, color:"var(--textDim)", margin:"6px 0 12px" }}>{i.xpNeeded} XP needed — ✅ You have enough!</div>
      <button onClick={()=>handleClaim(i)} style={{ width:"100%", padding:"10px 0", borderRadius:10, border:"none", background:"var(--accent)", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>🎉 Claim Reward</button>
    </div>))}</div></>}

    {locked.length > 0 && <><h3 style={{ fontSize:15, fontWeight:700, color:"var(--textDim)", margin:"20px 0 12px", display:"flex", alignItems:"center", gap:8 }}><Icons.Lock /> Locked — Keep earning XP!</h3>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12, marginBottom:20 }}>{locked.sort((a,b)=>a.xpNeeded-b.xpNeeded).map(i=>(<div key={i.id} style={{ background:"var(--card)", borderRadius:16, padding:20, border:"1px solid var(--border)", position:"relative", opacity:0.85 }}>
      <div style={{ position:"absolute", top:10, right:10 }}><DelBtn onClick={()=>c.ask("Remove item?",`Remove "${i.name}"?`,()=>handleDelete(i.id))} /></div>
      <div style={{ fontSize:40, marginBottom:8, filter:"grayscale(0.5)" }}>{i.emoji}</div><div style={{ fontSize:15, fontWeight:700, color:"var(--text)" }}>{i.name}</div><div style={{ fontSize:13, color:"var(--textDim)", fontWeight:600 }}>¥{i.price.toLocaleString()}</div>
      <div style={{ margin:"10px 0 4px" }}><ProgressBar value={xp} max={i.xpNeeded} color="var(--accent)" height={6} /></div>
      <div style={{ fontSize:11, color:"var(--textDim)" }}>{xp}/{i.xpNeeded} XP ({Math.round((xp/i.xpNeeded)*100)}%)</div>
    </div>))}</div></>}

    {claimed.length > 0 && <><h3 style={{ fontSize:15, fontWeight:700, color:"#10b981", margin:"20px 0 12px" }}>🎉 Claimed</h3>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12 }}>{claimed.map(i=>(<div key={i.id} style={{ background:"var(--card)", borderRadius:16, padding:20, border:"1px solid var(--border)", opacity:0.6, position:"relative" }}>
      <div style={{ position:"absolute", top:10, right:10 }}><DelBtn onClick={()=>c.ask("Remove item?",`Remove "${i.name}"?`,()=>handleDelete(i.id))} /></div>
      <div style={{ fontSize:40, marginBottom:8 }}>{i.emoji}</div><div style={{ fontSize:15, fontWeight:700, color:"var(--text)", textDecoration:"line-through" }}>{i.name}</div><div style={{ fontSize:13, color:"#10b981", fontWeight:600 }}>✅ Claimed!</div>
    </div>))}</div></>}

    {items.length===0 && <div style={{ textAlign:"center", padding:40, color:"var(--textDim)" }}>Add something you want to earn! The app calculates XP needed based on the price.</div>}

    <Modal open={modal} onClose={()=>setModal(false)} title="Add Wishlist Item">
      <Input label="What do you want?" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. New Monitor" />
      <Input label="Price (¥)" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="50000" />
      {form.price && <div style={{ fontSize:12, color:"var(--accent)", fontWeight:600, marginBottom:14 }}>XP needed: {priceToXp(parseInt(form.price)||0)} XP (you have {xp} XP)</div>}
      <div style={{ marginBottom:14 }}><label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--textDim)", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Icon</label><div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{emojis.map(e=>(<button key={e} onClick={()=>setForm({...form,emoji:e})} style={{ fontSize:28, padding:4, border:form.emoji===e?"2px solid var(--accent)":"2px solid transparent", borderRadius:10, background:form.emoji===e?"var(--cardHover)":"transparent", cursor:"pointer" }}>{e}</button>))}</div></div>
      <Btn onClick={handleAdd} style={{ width:"100%", justifyContent:"center", marginTop:8 }}>Add to Wishlist</Btn>
    </Modal>
    <ConfirmDialog open={c.open} title={c.title} message={c.msg} onConfirm={c.exec} onCancel={c.cancel} />
  </div>);
}

// ─── Auth Screen ───
function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const go = async()=>{ if(!email||!password){setError("Please fill in all fields");return;} if(password.length<6){setError("Password must be at least 6 characters");return;} setLoading(true); setError(""); try{ if(isLogin){const{error}=await supabase.auth.signInWithPassword({email,password}); if(error)throw error;}else{const{error}=await supabase.auth.signUp({email,password}); if(error)throw error;}}catch(e){setError(e.message||"Something went wrong"); setLoading(false);} };
  return (<div style={{ minHeight:"100vh", background:"#0a0f0d", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif", padding:20 }}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <div style={{ width:"100%", maxWidth:400 }}>
      <div style={{ textAlign:"center", marginBottom:40 }}><div style={{ fontSize:48, fontWeight:900, color:"#34d399" }}>△</div><div style={{ fontSize:32, fontWeight:900, color:"#e4efe8", marginTop:8 }}>Zenith</div><div style={{ fontSize:14, color:"#5a7d6a", marginTop:6 }}>Organize Everything</div></div>
      <div style={{ background:"#121a16", borderRadius:20, padding:32, border:"1px solid #1e3328" }}>
        <div style={{ display:"flex", gap:4, marginBottom:24, background:"#0a0f0d", borderRadius:12, padding:4 }}><button onClick={()=>{setIsLogin(true);setError("");}} style={{ flex:1, padding:"10px 0", borderRadius:9, border:"none", background:isLogin?"#34d399":"transparent", color:isLogin?"#0a0f0d":"#5a7d6a", fontSize:14, fontWeight:700, cursor:"pointer" }}>Sign In</button><button onClick={()=>{setIsLogin(false);setError("");}} style={{ flex:1, padding:"10px 0", borderRadius:9, border:"none", background:!isLogin?"#34d399":"transparent", color:!isLogin?"#0a0f0d":"#5a7d6a", fontSize:14, fontWeight:700, cursor:"pointer" }}>Sign Up</button></div>
        {error && <div style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#ef4444", marginBottom:16 }}>{error}</div>}
        <div style={{ marginBottom:16 }}><label style={{ display:"block", fontSize:12, fontWeight:600, color:"#5a7d6a", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" onKeyDown={e=>e.key==="Enter"&&go()} style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1px solid #1e3328", background:"#0e1511", color:"#e4efe8", fontSize:14, outline:"none", boxSizing:"border-box" }} /></div>
        <div style={{ marginBottom:24 }}><label style={{ display:"block", fontSize:12, fontWeight:600, color:"#5a7d6a", marginBottom:6, textTransform:"uppercase", letterSpacing:1 }}>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&go()} style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1px solid #1e3328", background:"#0e1511", color:"#e4efe8", fontSize:14, outline:"none", boxSizing:"border-box" }} /></div>
        <button onClick={go} disabled={loading} style={{ width:"100%", padding:"14px 0", borderRadius:12, border:"none", background:"#34d399", color:"#0a0f0d", fontSize:16, fontWeight:800, cursor:loading?"wait":"pointer", opacity:loading?0.7:1 }}>{loading?"Loading...":isLogin?"Sign In":"Create Account"}</button>
      </div>
      <div style={{ textAlign:"center", marginTop:20, fontSize:12, color:"#5a7d6a" }}>Your data syncs across all devices</div>
    </div></div>);
}

// ─── Main App ───
export default function App() {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true); const [page, setPage] = useState("dashboard");
  const [data, setData] = useState({ expenses:[], todos:[], subscriptions:[], journal:[], books:[], studySessions:[] });
  const [profile, setProfile] = useState({ monthly_budget:100000, xp:0, level:1, streak:0 });
  const [resetModal, setResetModal] = useState(false);

  useEffect(()=>{ supabase.auth.getSession().then(({data:{session}})=>{setUser(session?.user||null); setLoading(false);}); const{data:{subscription}}=supabase.auth.onAuthStateChange((_,s)=>{setUser(s?.user||null); setLoading(false);}); return()=>subscription.unsubscribe(); },[]);

  const loadAll = useCallback(async()=>{ if(!user) return; const[expenses,todos,subscriptions,journal,books,studySessions,prof]=await Promise.all([db.getExpenses(user.id),db.getTodos(user.id),db.getSubscriptions(user.id),db.getJournal(user.id),db.getBooks(user.id),db.getStudySessions(user.id),db.getProfile(user.id)]); setData({expenses,todos,subscriptions,journal,books,studySessions}); if(prof) setProfile(prof); },[user]);
  useEffect(()=>{loadAll();},[loadAll]);

  const updateProfile = async(u)=>{ if(!user) return; await db.updateProfile(user.id,u); setProfile(p=>({...p,...u})); };
  const handleReset = async()=>{ await db.hardReset(user.id); setProfile({monthly_budget:100000,xp:0,level:1,streak:0}); await loadAll(); };
  const handleLogout = async()=>{ await supabase.auth.signOut(); setUser(null); };

  if(loading) return <div style={{ minHeight:"100vh", background:"#0a0f0d", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16 }}><div style={{ fontSize:48, fontWeight:900, color:"#34d399" }}>△</div><div style={{ fontSize:14, color:"#5a7d6a" }}>Loading...</div></div>;
  if(!user) return <AuthScreen />;

  const navItems = [{key:"dashboard",label:"Home",icon:Icons.Home},{key:"budget",label:"Budget",icon:Icons.Wallet},{key:"todos",label:"Tasks",icon:Icons.Check},{key:"subs",label:"Subs",icon:Icons.Repeat},{key:"journal",label:"Journal",icon:Icons.Pen},{key:"books",label:"Books",icon:Icons.Book},{key:"study",label:"Study",icon:Icons.Study},{key:"wishlist",label:"Wishlist",icon:Icons.Gift}];
  const pp = { data, userId:user.id, refresh:loadAll, profile, updateProfile };
  const pages = { dashboard:<DashboardPage {...pp} />, budget:<BudgetPage {...pp} />, todos:<TodoPage {...pp} />, subs:<SubscriptionsPage {...pp} />, journal:<JournalPage {...pp} />, books:<BooksPage {...pp} />, study:<StudyPage {...pp} />, wishlist:<WishlistPage userId={user.id} profile={profile} /> };
  const userName = user.email?.split("@")[0]||"User";

  return (<div style={{ "--bg":"#0a0f0d","--card":"#121a16","--cardHover":"#1a2820","--border":"#1e3328","--text":"#e4efe8","--textSoft":"#a8c4b4","--textDim":"#5a7d6a","--accent":"#34d399","--accentAlt":"#10b981","--inputBg":"#0e1511", minHeight:"100vh", background:"var(--bg)", color:"var(--text)", fontFamily:"'DM Sans','Nunito',-apple-system,BlinkMacSystemFont,sans-serif", display:"flex" }}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}} *{box-sizing:border-box} ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px} input:focus,select:focus,textarea:focus{border-color:var(--accent)!important;box-shadow:0 0 0 3px rgba(52,211,153,0.15)} button:hover{filter:brightness(1.08)} @media(max-width:768px){.desktop-sidebar{display:none!important}.main-content{padding:16px 14px 90px 14px!important;max-width:100%!important}.mobile-bottom-nav{display:flex!important}} @media(min-width:769px){.mobile-bottom-nav{display:none!important}}`}</style>

    <nav className="desktop-sidebar" style={{ width:220, minHeight:"100vh", background:"var(--card)", borderRight:"1px solid var(--border)", padding:"24px 12px", display:"flex", flexDirection:"column", flexShrink:0, position:"sticky", top:0 }}>
      <div style={{ padding:"0 10px", marginBottom:32 }}><div style={{ fontSize:20, fontWeight:900, color:"var(--accent)", letterSpacing:-0.5 }}>△ Zenith</div><div style={{ fontSize:11, color:"var(--textDim)", marginTop:2 }}>Organize Everything</div></div>
      <div style={{ display:"flex", flexDirection:"column", gap:2, flex:1 }}>{navItems.map(i=>{const a=page===i.key; const I=i.icon; return (<button key={i.key} onClick={()=>setPage(i.key)} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", borderRadius:12, border:"none", background:a?"var(--accent)":"transparent", color:a?"#0a0f0d":"var(--textDim)", fontSize:14, fontWeight:a?700:500, cursor:"pointer", transition:"all 0.2s", textAlign:"left" }}><I />{i.label}</button>);})}</div>
      <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, marginTop:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, padding:"0 6px" }}><div style={{ width:32, height:32, borderRadius:"50%", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#0a0f0d" }}>{userName[0].toUpperCase()}</div><div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{userName}</div><button onClick={handleLogout} style={{ background:"none", border:"none", color:"var(--textDim)", fontSize:11, cursor:"pointer", padding:0, fontWeight:500 }}>Sign Out</button></div></div>
        <div style={{ background:"var(--bg)", borderRadius:14, padding:"14px 16px", border:"1px solid var(--border)", marginBottom:10 }}><div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}><Icons.Fire /><span style={{ fontSize:14, fontWeight:800, color:"var(--accent)" }}>Lv.{profile.level||1}</span><span style={{ fontSize:12, color:"var(--textDim)" }}>{profile.xp||0} XP</span></div><ProgressBar value={(profile.xp||0)%300||300} max={300} height={5} /></div>
        <button onClick={()=>setResetModal(true)} style={{ width:"100%", padding:"8px 14px", borderRadius:10, border:"1px solid rgba(239,68,68,0.3)", background:"transparent", color:"#ef4444", fontSize:12, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><Icons.Reset /> Hard Reset</button>
      </div>
    </nav>

    <main className="main-content" style={{ flex:1, padding:"28px 36px", maxWidth:960, minHeight:"100vh" }}>{pages[page]}</main>

    <nav className="mobile-bottom-nav" style={{ display:"none", position:"fixed", bottom:0, left:0, right:0, background:"var(--card)", borderTop:"1px solid var(--border)", padding:"6px 2px 10px", zIndex:100, justifyContent:"space-around", alignItems:"center", backdropFilter:"blur(20px)" }}>
      {navItems.map(i=>{const a=page===i.key; const I=i.icon; return (<button key={i.key} onClick={()=>setPage(i.key)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 6px", borderRadius:10, border:"none", background:"transparent", color:a?"var(--accent)":"var(--textDim)", fontSize:9, fontWeight:a?700:500, cursor:"pointer", minWidth:40 }}><I />{i.label}</button>);})}
    </nav>

    <HardResetModal open={resetModal} onClose={()=>setResetModal(false)} onReset={handleReset} />
  </div>);
}