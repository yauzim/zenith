import { useState, useEffect, useReducer, useCallback, useRef } from "react";

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
  Star: () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-4 h-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Trophy: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  ChevRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Zap: () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

// ─── Storage helpers ───
const loadState = () => {
  try {
    const s = localStorage.getItem("zenithApp");
    return s ? JSON.parse(s) : null;
  } catch { return null; }
};

const defaultState = {
  expenses: [
    { id: 1, name: "Groceries", amount: 4500, category: "Food", date: "2026-03-18", type: "expense" },
    { id: 2, name: "Train Pass", amount: 12000, category: "Transport", date: "2026-03-15", type: "expense" },
    { id: 3, name: "Salary", amount: 280000, category: "Income", date: "2026-03-01", type: "income" },
  ],
  todos: [
    { id: 1, text: "Review budget for April", done: false, priority: "high" },
    { id: 2, text: "Clean apartment", done: true, priority: "medium" },
    { id: 3, text: "Submit university report", done: false, priority: "high" },
  ],
  subscriptions: [
    { id: 1, name: "Netflix", amount: 1490, cycle: "monthly", nextDate: "2026-04-01", active: true, color: "#E50914" },
    { id: 2, name: "Spotify", amount: 980, cycle: "monthly", nextDate: "2026-04-05", active: true, color: "#1DB954" },
    { id: 3, name: "iCloud", amount: 400, cycle: "monthly", nextDate: "2026-04-10", active: true, color: "#3693F5" },
  ],
  journal: [
    { id: 1, date: "2026-03-18", mood: "😊", title: "Productive day", content: "Finished two chapters of my book and had a great study session. Feeling motivated!" },
    { id: 2, date: "2026-03-17", mood: "😌", title: "Calm Sunday", content: "Rested well, did some light reading and meal prep for the week." },
  ],
  books: [
    { id: 1, title: "Atomic Habits", author: "James Clear", totalChapters: 20, chaptersRead: 14, status: "reading", cover: "📗" },
    { id: 2, title: "1Q84", author: "Haruki Murakami", totalChapters: 31, chaptersRead: 31, status: "completed", cover: "📘" },
    { id: 3, title: "Genki I", author: "Eri Banno", totalChapters: 23, chaptersRead: 0, status: "backlog", cover: "📕" },
    { id: 4, title: "Deep Work", author: "Cal Newport", totalChapters: 14, chaptersRead: 0, status: "backlog", cover: "📙" },
  ],
  studySessions: {
    japanese: { streak: 7, totalSessions: 42, todayDone: true, weekLog: [true, true, true, false, true, true, true] },
    uni: { streak: 3, totalSessions: 28, todayDone: false, weekLog: [false, true, true, false, false, true, true] },
  },
  streak: 7,
  xp: 1250,
  level: 5,
  monthlyBudget: 100000,
};

// ─── Reducer ───
function reducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": return { ...state, expenses: [...state.expenses, { ...action.payload, id: Date.now() }] };
    case "DEL_EXPENSE": return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
    case "ADD_TODO": return { ...state, todos: [...state.todos, { id: Date.now(), text: action.payload.text, done: false, priority: action.payload.priority || "medium" }] };
    case "TOGGLE_TODO": return { ...state, todos: state.todos.map(t => t.id === action.payload ? { ...t, done: !t.done } : t) };
    case "DEL_TODO": return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
    case "ADD_SUB": return { ...state, subscriptions: [...state.subscriptions, { ...action.payload, id: Date.now() }] };
    case "TOGGLE_SUB": return { ...state, subscriptions: state.subscriptions.map(s => s.id === action.payload ? { ...s, active: !s.active } : s) };
    case "DEL_SUB": return { ...state, subscriptions: state.subscriptions.filter(s => s.id !== action.payload) };
    case "ADD_JOURNAL": return { ...state, journal: [{ ...action.payload, id: Date.now() }, ...state.journal] };
    case "ADD_BOOK": return { ...state, books: [...state.books, { ...action.payload, id: Date.now() }] };
    case "UPDATE_BOOK": return { ...state, books: state.books.map(b => b.id === action.payload.id ? { ...b, ...action.payload } : b) };
    case "DEL_BOOK": return { ...state, books: state.books.filter(b => b.id !== action.payload) };
    case "STUDY_CHECKIN": {
      const subj = action.payload;
      const sess = { ...state.studySessions[subj] };
      sess.todayDone = true;
      sess.totalSessions += 1;
      sess.streak += 1;
      sess.weekLog = [...sess.weekLog.slice(1), true];
      const newXp = state.xp + 50;
      const newLevel = Math.floor(newXp / 300) + 1;
      return { ...state, studySessions: { ...state.studySessions, [subj]: sess }, xp: newXp, level: newLevel, streak: Math.max(state.streak, sess.streak) };
    }
    case "SET_BUDGET": return { ...state, monthlyBudget: action.payload };
    default: return state;
  }
}

// ─── Components ───

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "var(--card)", borderRadius: 16, padding: 28, minWidth: 340, maxWidth: 440, width: "90%", boxShadow: "0 24px 80px rgba(0,0,0,0.3)", border: "1px solid var(--border)", animation: "modalIn 0.25s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--textDim)", cursor: "pointer", padding: 4 }}><Icons.X /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--textDim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>}
      <input {...props} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--inputBg)", color: "var(--text)", fontSize: 14, outline: "none", boxSizing: "border-box", ...props.style }} />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--textDim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</label>}
      <select {...props} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--inputBg)", color: "var(--text)", fontSize: 14, outline: "none", boxSizing: "border-box" }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Btn({ children, variant = "primary", ...props }) {
  const bg = variant === "primary" ? "var(--accent)" : variant === "danger" ? "#ef4444" : "var(--cardHover)";
  const clr = variant === "ghost" ? "var(--text)" : "#fff";
  return (
    <button {...props} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: bg, color: clr, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.2s", opacity: props.disabled ? 0.5 : 1, ...props.style }}>
      {children}
    </button>
  );
}

function ProgressBar({ value, max, color = "var(--accent)", height = 8 }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ width: "100%", height, background: "var(--border)", borderRadius: height, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: height, transition: "width 0.5s ease" }} />
    </div>
  );
}

function StreakDots({ weekLog }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {weekLog.map((done, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? "var(--accent)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: done ? "#fff" : "var(--textDim)", transition: "all 0.3s" }}>
            {done ? "✓" : ""}
          </div>
          <span style={{ fontSize: 10, color: "var(--textDim)", fontWeight: 500 }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Pages ───

function DashboardPage({ state, dispatch }) {
  const totalExpenses = state.expenses.filter(e => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const totalIncome = state.expenses.filter(e => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const activeSubs = state.subscriptions.filter(s => s.active).reduce((s, sub) => s + sub.amount, 0);
  const todosLeft = state.todos.filter(t => !t.done).length;
  const booksReading = state.books.filter(b => b.status === "reading").length;
  const xpForNext = state.level * 300;
  const xpInLevel = state.xp - (state.level - 1) * 300;

  const statCards = [
    { label: "Monthly Budget", value: `¥${state.monthlyBudget.toLocaleString()}`, sub: `¥${(state.monthlyBudget - totalExpenses).toLocaleString()} left`, color: "#10b981", icon: "💰" },
    { label: "Expenses", value: `¥${totalExpenses.toLocaleString()}`, sub: `${state.expenses.filter(e => e.type === "expense").length} transactions`, color: "#f59e0b", icon: "📊" },
    { label: "Subscriptions", value: `¥${activeSubs.toLocaleString()}/mo`, sub: `${state.subscriptions.filter(s => s.active).length} active`, color: "#8b5cf6", icon: "🔄" },
    { label: "Tasks", value: `${todosLeft} pending`, sub: `${state.todos.filter(t => t.done).length} completed`, color: "#3b82f6", icon: "✅" },
  ];

  return (
    <div>
      {/* XP / Level Bar */}
      <div style={{ background: "linear-gradient(135deg, #059669, #10b981, #34d399)", borderRadius: 20, padding: "24px 28px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -20, fontSize: 100, opacity: 0.1 }}>🔥</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, position: "relative" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 1 }}>Level {state.level}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{state.xp} XP</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff" }}>
              <Icons.Fire />
              <span style={{ fontSize: 24, fontWeight: 800 }}>{state.streak}</span>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>day streak</div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, height: 10, overflow: "hidden" }}>
          <div style={{ width: `${(xpInLevel / 300) * 100}%`, height: "100%", background: "#fff", borderRadius: 10, transition: "width 0.6s ease" }} />
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 6, textAlign: "right" }}>{xpInLevel}/300 XP to Level {state.level + 1}</div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
        {statCards.map((c, i) => (
          <div key={i} style={{ background: "var(--card)", borderRadius: 16, padding: "20px 18px", border: "1px solid var(--border)", transition: "transform 0.2s", cursor: "default" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--textDim)", textTransform: "uppercase", letterSpacing: 0.5 }}>{c.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginTop: 4 }}>{c.value}</div>
                <div style={{ fontSize: 12, color: c.color, fontWeight: 600, marginTop: 4 }}>{c.sub}</div>
              </div>
              <span style={{ fontSize: 28 }}>{c.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Study Progress */}
        <div style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>📚 Study Progress</h3>
          {Object.entries(state.studySessions).map(([key, sess]) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", textTransform: "capitalize" }}>{key === "japanese" ? "🇯🇵 Japanese" : "🎓 Uni Exam"}</span>
                <span style={{ fontSize: 12, color: sess.todayDone ? "#10b981" : "var(--textDim)", fontWeight: 600 }}>{sess.todayDone ? "✓ Done" : "Pending"}</span>
              </div>
              <StreakDots weekLog={sess.weekLog} />
            </div>
          ))}
        </div>

        {/* Recent Books */}
        <div style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>📖 Currently Reading</h3>
          {state.books.filter(b => b.status === "reading").map(book => (
            <div key={book.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 32 }}>{book.cover}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{book.title}</div>
                <div style={{ fontSize: 11, color: "var(--textDim)" }}>{book.author}</div>
                <ProgressBar value={book.chaptersRead} max={book.totalChapters} height={5} />
                <div style={{ fontSize: 10, color: "var(--textDim)", marginTop: 3 }}>{book.chaptersRead}/{book.totalChapters} chapters</div>
              </div>
            </div>
          ))}
          {state.books.filter(b => b.status === "reading").length === 0 && <div style={{ fontSize: 13, color: "var(--textDim)" }}>No books in progress</div>}
        </div>
      </div>
    </div>
  );
}

function BudgetPage({ state, dispatch }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().split("T")[0] });
  const [budgetEdit, setBudgetEdit] = useState(false);
  const [newBudget, setNewBudget] = useState(state.monthlyBudget);

  const categories = ["Food", "Transport", "Housing", "Entertainment", "Shopping", "Health", "Education", "Income", "Other"];
  const catColors = { Food: "#f59e0b", Transport: "#3b82f6", Housing: "#8b5cf6", Entertainment: "#ec4899", Shopping: "#f97316", Health: "#10b981", Education: "#6366f1", Income: "#22c55e", Other: "#64748b" };

  const totalExpenses = state.expenses.filter(e => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const totalIncome = state.expenses.filter(e => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const remaining = state.monthlyBudget - totalExpenses;

  const byCategory = {};
  state.expenses.filter(e => e.type === "expense").forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });

  const handleAdd = () => {
    if (!form.name || !form.amount) return;
    dispatch({ type: "ADD_EXPENSE", payload: { ...form, amount: parseInt(form.amount) } });
    setForm({ name: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().split("T")[0] });
    setModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: 0 }}>Budget</h2>
          <p style={{ fontSize: 13, color: "var(--textDim)", margin: "4px 0 0" }}>Track your daily & monthly expenses</p>
        </div>
        <Btn onClick={() => setModal(true)}><Icons.Plus /> Add Entry</Btn>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <div style={{ background: "var(--card)", borderRadius: 16, padding: 20, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 12, color: "var(--textDim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Income</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#22c55e", marginTop: 4 }}>¥{totalIncome.toLocaleString()}</div>
        </div>
        <div style={{ background: "var(--card)", borderRadius: 16, padding: 20, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 12, color: "var(--textDim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Expenses</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#f59e0b", marginTop: 4 }}>¥{totalExpenses.toLocaleString()}</div>
        </div>
        <div style={{ background: "var(--card)", borderRadius: 16, padding: 20, border: "1px solid var(--border)", cursor: "pointer" }} onClick={() => setBudgetEdit(true)}>
          <div style={{ fontSize: 12, color: "var(--textDim)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Remaining Budget</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: remaining >= 0 ? "#10b981" : "#ef4444", marginTop: 4 }}>¥{remaining.toLocaleString()}</div>
          <ProgressBar value={totalExpenses} max={state.monthlyBudget} color={remaining >= 0 ? "#10b981" : "#ef4444"} />
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)", marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginTop: 0, marginBottom: 16 }}>Spending by Category</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => (
            <div key={cat} style={{ background: "var(--bg)", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--border)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: catColors[cat] || "#64748b" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{cat}</span>
              <span style={{ fontSize: 13, color: "var(--textDim)" }}>¥{amt.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginTop: 0, marginBottom: 16 }}>Transactions</h3>
        {state.expenses.sort((a, b) => b.date.localeCompare(a.date)).map(exp => (
          <div key={exp.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: catColors[exp.category] || "#64748b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>
                {exp.category[0]}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{exp.name}</div>
                <div style={{ fontSize: 11, color: "var(--textDim)" }}>{exp.date} · {exp.category}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: exp.type === "income" ? "#22c55e" : "var(--text)" }}>
                {exp.type === "income" ? "+" : "-"}¥{exp.amount.toLocaleString()}
              </span>
              <button onClick={() => dispatch({ type: "DEL_EXPENSE", payload: exp.id })} style={{ background: "none", border: "none", color: "var(--textDim)", cursor: "pointer", padding: 4, opacity: 0.6 }}><Icons.Trash /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Transaction">
        <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Lunch at Sushiro" />
        <Input label="Amount (¥)" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="1500" />
        <Select label="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} options={[{ value: "expense", label: "Expense" }, { value: "income", label: "Income" }]} />
        <Select label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} options={categories.map(c => ({ value: c, label: c }))} />
        <Input label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <Btn onClick={handleAdd} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Add Transaction</Btn>
      </Modal>

      <Modal open={budgetEdit} onClose={() => setBudgetEdit(false)} title="Set Monthly Budget">
        <Input label="Monthly Budget (¥)" type="number" value={newBudget} onChange={e => setNewBudget(parseInt(e.target.value) || 0)} />
        <Btn onClick={() => { dispatch({ type: "SET_BUDGET", payload: newBudget }); setBudgetEdit(false); }} style={{ width: "100%", justifyContent: "center" }}>Save Budget</Btn>
      </Modal>
    </div>
  );
}

function TodoPage({ state, dispatch }) {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch({ type: "ADD_TODO", payload: { text, priority } });
    setText("");
    setModal(false);
  };

  const priColors = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };
  const sorted = [...state.todos].sort((a, b) => { const order = { high: 0, medium: 1, low: 2 }; return (a.done - b.done) || (order[a.priority] - order[b.priority]); });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: 0 }}>To-Do List</h2>
          <p style={{ fontSize: 13, color: "var(--textDim)", margin: "4px 0 0" }}>{state.todos.filter(t => !t.done).length} tasks remaining</p>
        </div>
        <Btn onClick={() => setModal(true)}><Icons.Plus /> Add Task</Btn>
      </div>

      {/* Progress */}
      <div style={{ background: "var(--card)", borderRadius: 16, padding: 20, border: "1px solid var(--border)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Progress</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>{state.todos.filter(t => t.done).length}/{state.todos.length}</span>
        </div>
        <ProgressBar value={state.todos.filter(t => t.done).length} max={Math.max(state.todos.length, 1)} />
      </div>

      {/* Tasks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map(todo => (
          <div key={todo.id} style={{ background: "var(--card)", borderRadius: 14, padding: "14px 18px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, opacity: todo.done ? 0.5 : 1, transition: "all 0.3s" }}>
            <button onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })} style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${todo.done ? "var(--accent)" : "var(--border)"}`, background: todo.done ? "var(--accent)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
              {todo.done && <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><polyline points="20 6 9 17 4 12"/></svg>}
            </button>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "var(--text)", textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: priColors[todo.priority], flexShrink: 0 }} title={todo.priority} />
            <button onClick={() => dispatch({ type: "DEL_TODO", payload: todo.id })} style={{ background: "none", border: "none", color: "var(--textDim)", cursor: "pointer", padding: 2, opacity: 0.5 }}><Icons.Trash /></button>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="New Task">
        <Input label="Task" value={text} onChange={e => setText(e.target.value)} placeholder="What needs to be done?" onKeyDown={e => e.key === "Enter" && handleAdd()} />
        <Select label="Priority" value={priority} onChange={e => setPriority(e.target.value)} options={[{ value: "high", label: "🔴 High" }, { value: "medium", label: "🟡 Medium" }, { value: "low", label: "🟢 Low" }]} />
        <Btn onClick={handleAdd} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Add Task</Btn>
      </Modal>
    </div>
  );
}

function SubscriptionsPage({ state, dispatch }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", cycle: "monthly", nextDate: "", active: true, color: "#8b5cf6" });

  const totalMonthly = state.subscriptions.filter(s => s.active).reduce((sum, s) => sum + (s.cycle === "yearly" ? Math.round(s.amount / 12) : s.amount), 0);
  const totalYearly = totalMonthly * 12;

  const handleAdd = () => {
    if (!form.name || !form.amount) return;
    dispatch({ type: "ADD_SUB", payload: { ...form, amount: parseInt(form.amount) } });
    setForm({ name: "", amount: "", cycle: "monthly", nextDate: "", active: true, color: "#8b5cf6" });
    setModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: 0 }}>Subscriptions</h2>
          <p style={{ fontSize: 13, color: "var(--textDim)", margin: "4px 0 0" }}>Manage recurring payments</p>
        </div>
        <Btn onClick={() => setModal(true)}><Icons.Plus /> Add Sub</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        <div style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 12, color: "var(--textDim)", fontWeight: 600, textTransform: "uppercase" }}>Monthly Total</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", marginTop: 4 }}>¥{totalMonthly.toLocaleString()}</div>
        </div>
        <div style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 12, color: "var(--textDim)", fontWeight: 600, textTransform: "uppercase" }}>Yearly Estimate</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", marginTop: 4 }}>¥{totalYearly.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {state.subscriptions.map(sub => (
          <div key={sub.id} style={{ background: "var(--card)", borderRadius: 16, padding: "18px 22px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16, opacity: sub.active ? 1 : 0.45 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: sub.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff" }}>
              {sub.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{sub.name}</div>
              <div style={{ fontSize: 12, color: "var(--textDim)" }}>{sub.cycle} · next: {sub.nextDate || "—"}</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginRight: 8 }}>¥{sub.amount.toLocaleString()}</div>
            <button onClick={() => dispatch({ type: "TOGGLE_SUB", payload: sub.id })} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid var(--border)", background: sub.active ? "var(--accent)" : "var(--cardHover)", color: sub.active ? "#fff" : "var(--textDim)", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              {sub.active ? "Active" : "Paused"}
            </button>
            <button onClick={() => dispatch({ type: "DEL_SUB", payload: sub.id })} style={{ background: "none", border: "none", color: "var(--textDim)", cursor: "pointer", padding: 4, opacity: 0.5 }}><Icons.Trash /></button>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Subscription">
        <Input label="Service Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Disney+" />
        <Input label="Amount (¥)" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="990" />
        <Select label="Billing Cycle" value={form.cycle} onChange={e => setForm({ ...form, cycle: e.target.value })} options={[{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Yearly" }]} />
        <Input label="Next Billing Date" type="date" value={form.nextDate} onChange={e => setForm({ ...form, nextDate: e.target.value })} />
        <Input label="Brand Color" type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
        <Btn onClick={handleAdd} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Add Subscription</Btn>
      </Modal>
    </div>
  );
}

function JournalPage({ state, dispatch }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", mood: "😊", date: new Date().toISOString().split("T")[0] });

  const moods = ["😊", "😌", "😐", "😢", "😤", "🤩", "😴", "🤔"];

  const handleAdd = () => {
    if (!form.title) return;
    dispatch({ type: "ADD_JOURNAL", payload: form });
    setForm({ title: "", content: "", mood: "😊", date: new Date().toISOString().split("T")[0] });
    setModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: 0 }}>Journal</h2>
          <p style={{ fontSize: 13, color: "var(--textDim)", margin: "4px 0 0" }}>Reflect on your day</p>
        </div>
        <Btn onClick={() => setModal(true)}><Icons.Plus /> New Entry</Btn>
      </div>

      {/* Mood Grid */}
      <div style={{ background: "var(--card)", borderRadius: 16, padding: 20, border: "1px solid var(--border)", marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginTop: 0, marginBottom: 12 }}>Recent Moods</h3>
        <div style={{ display: "flex", gap: 8 }}>
          {state.journal.slice(0, 7).map((entry, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 28 }}>{entry.mood}</span>
              <span style={{ fontSize: 10, color: "var(--textDim)" }}>{entry.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {state.journal.map(entry => (
          <div key={entry.id} style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 24 }}>{entry.mood}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>{entry.title}</h3>
                </div>
                <div style={{ fontSize: 12, color: "var(--textDim)", marginTop: 4 }}>{entry.date}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "var(--textSoft)", lineHeight: 1.7, margin: 0 }}>{entry.content}</p>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="New Journal Entry">
        <Input label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--textDim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Mood</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {moods.map(m => (
              <button key={m} onClick={() => setForm({ ...form, mood: m })} style={{ fontSize: 28, padding: 4, border: form.mood === m ? "2px solid var(--accent)" : "2px solid transparent", borderRadius: 10, background: form.mood === m ? "var(--cardHover)" : "transparent", cursor: "pointer" }}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="How was your day?" />
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--textDim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Content</label>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Write your thoughts..." rows={5} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--inputBg)", color: "var(--text)", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
        </div>
        <Btn onClick={handleAdd} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Save Entry</Btn>
      </Modal>
    </div>
  );
}

function BooksPage({ state, dispatch }) {
  const [modal, setModal] = useState(false);
  const [tab, setTab] = useState("reading");
  const [form, setForm] = useState({ title: "", author: "", totalChapters: "", chaptersRead: "0", status: "backlog", cover: "📗" });

  const covers = ["📗", "📘", "📕", "📙", "📓", "📔", "📒"];
  const tabs = [
    { key: "reading", label: "Reading", count: state.books.filter(b => b.status === "reading").length },
    { key: "completed", label: "Completed", count: state.books.filter(b => b.status === "completed").length },
    { key: "backlog", label: "Backlog", count: state.books.filter(b => b.status === "backlog").length },
  ];

  const recommendations = [
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cover: "📘" },
    { title: "The Art of War", author: "Sun Tzu", cover: "📕" },
    { title: "Sapiens", author: "Yuval Noah Harari", cover: "📗" },
    { title: "Norwegian Wood", author: "Haruki Murakami", cover: "📙" },
  ];

  const handleAdd = () => {
    if (!form.title) return;
    dispatch({ type: "ADD_BOOK", payload: { ...form, totalChapters: parseInt(form.totalChapters) || 1, chaptersRead: parseInt(form.chaptersRead) || 0 } });
    setForm({ title: "", author: "", totalChapters: "", chaptersRead: "0", status: "backlog", cover: "📗" });
    setModal(false);
  };

  const filteredBooks = state.books.filter(b => b.status === tab);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: 0 }}>Book Shelf</h2>
          <p style={{ fontSize: 13, color: "var(--textDim)", margin: "4px 0 0" }}>{state.books.length} books tracked</p>
        </div>
        <Btn onClick={() => setModal(true)}><Icons.Plus /> Add Book</Btn>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "var(--card)", borderRadius: 12, padding: 4, border: "1px solid var(--border)" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: 1, padding: "10px 16px", borderRadius: 9, border: "none", background: tab === t.key ? "var(--accent)" : "transparent", color: tab === t.key ? "#fff" : "var(--textDim)", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
        {filteredBooks.map(book => (
          <div key={book.id} style={{ background: "var(--card)", borderRadius: 16, padding: 20, border: "1px solid var(--border)", position: "relative" }}>
            <button onClick={() => dispatch({ type: "DEL_BOOK", payload: book.id })} style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", color: "var(--textDim)", cursor: "pointer", opacity: 0.4 }}><Icons.Trash /></button>
            <div style={{ fontSize: 48, marginBottom: 10 }}>{book.cover}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{book.title}</div>
            <div style={{ fontSize: 12, color: "var(--textDim)", marginBottom: 12 }}>{book.author}</div>
            {book.status !== "backlog" && (
              <div>
                <ProgressBar value={book.chaptersRead} max={book.totalChapters} height={6} color={book.status === "completed" ? "#10b981" : "var(--accent)"} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--textDim)" }}>
                  <span>{book.chaptersRead}/{book.totalChapters} chapters</span>
                  <span>{Math.round((book.chaptersRead / book.totalChapters) * 100)}%</span>
                </div>
                {book.status === "reading" && (
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    <button onClick={() => dispatch({ type: "UPDATE_BOOK", payload: { id: book.id, chaptersRead: Math.max(0, book.chaptersRead - 1) } })} style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--textDim)", fontSize: 16, cursor: "pointer" }}>−</button>
                    <button onClick={() => {
                      const next = Math.min(book.totalChapters, book.chaptersRead + 1);
                      dispatch({ type: "UPDATE_BOOK", payload: { id: book.id, chaptersRead: next, status: next >= book.totalChapters ? "completed" : "reading" } });
                    }} style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: "none", background: "var(--accent)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>+</button>
                  </div>
                )}
              </div>
            )}
            {book.status === "backlog" && (
              <Btn onClick={() => dispatch({ type: "UPDATE_BOOK", payload: { id: book.id, status: "reading" } })} variant="ghost" style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "8px 12px", marginTop: 4 }}>
                Start Reading
              </Btn>
            )}
          </div>
        ))}
        {filteredBooks.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 30, color: "var(--textDim)", fontSize: 14 }}>No books here yet</div>}
      </div>

      {/* Recommendations */}
      <div style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginTop: 0, marginBottom: 16 }}>📚 Recommendations</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          {recommendations.map((rec, i) => (
            <div key={i} style={{ background: "var(--bg)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
              onClick={() => dispatch({ type: "ADD_BOOK", payload: { ...rec, totalChapters: 15, chaptersRead: 0, status: "backlog" } })}>
              <span style={{ fontSize: 28 }}>{rec.cover}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{rec.title}</div>
                <div style={{ fontSize: 11, color: "var(--textDim)" }}>{rec.author}</div>
                <div style={{ fontSize: 10, color: "var(--accent)", fontWeight: 600, marginTop: 2 }}>+ Add to backlog</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Book">
        <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Book title" />
        <Input label="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author name" />
        <Input label="Total Chapters" type="number" value={form.totalChapters} onChange={e => setForm({ ...form, totalChapters: e.target.value })} />
        <Input label="Chapters Read" type="number" value={form.chaptersRead} onChange={e => setForm({ ...form, chaptersRead: e.target.value })} />
        <Select label="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} options={[{ value: "backlog", label: "Backlog" }, { value: "reading", label: "Reading" }, { value: "completed", label: "Completed" }]} />
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--textDim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Cover</label>
          <div style={{ display: "flex", gap: 8 }}>
            {covers.map(c => (
              <button key={c} onClick={() => setForm({ ...form, cover: c })} style={{ fontSize: 28, padding: 4, border: form.cover === c ? "2px solid var(--accent)" : "2px solid transparent", borderRadius: 8, background: "transparent", cursor: "pointer" }}>{c}</button>
            ))}
          </div>
        </div>
        <Btn onClick={handleAdd} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Add Book</Btn>
      </Modal>
    </div>
  );
}

function StudyPage({ state, dispatch }) {
  const subjects = [
    { key: "japanese", label: "Japanese", emoji: "🇯🇵", color: "#ef4444", desc: "Daily kanji, grammar & vocabulary practice" },
    { key: "uni", label: "University Exam", emoji: "🎓", color: "#0d9488", desc: "Exam prep, problem sets & review" },
  ];

  const totalXP = state.xp;
  const level = state.level;
  const nextLevelXP = level * 300;
  const milestones = [
    { xp: 300, label: "Beginner", icon: "🌱" },
    { xp: 900, label: "Consistent", icon: "⚡" },
    { xp: 1500, label: "Dedicated", icon: "🔥" },
    { xp: 3000, label: "Master", icon: "👑" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: 0 }}>Study Check-in</h2>
        <p style={{ fontSize: 13, color: "var(--textDim)", margin: "4px 0 0" }}>Build your streak & earn XP</p>
      </div>

      {/* Motivation Banner */}
      <div style={{ background: "linear-gradient(135deg, #047857, #059669, #10b981)", borderRadius: 20, padding: "26px 28px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: 10, fontSize: 90, opacity: 0.12 }}>🏆</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Your Streak</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: "#fff" }}>{state.streak}</span>
              <span style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>days</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>
              {state.streak >= 7 ? "🔥 On fire! Keep it going!" : state.streak >= 3 ? "⚡ Building momentum!" : "🌱 Every day counts!"}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 42, marginBottom: 4 }}>
              {milestones.filter(m => totalXP >= m.xp).pop()?.icon || "🌱"}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              {milestones.filter(m => totalXP >= m.xp).pop()?.label || "Novice"}
            </div>
          </div>
        </div>
      </div>

      {/* Subject Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {subjects.map(subj => {
          const sess = state.studySessions[subj.key];
          return (
            <div key={subj.key} style={{ background: "var(--card)", borderRadius: 18, padding: 24, border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{subj.emoji}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>{subj.label}</div>
                  <div style={{ fontSize: 12, color: "var(--textDim)" }}>{subj.desc}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                <div style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 14px", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, color: "var(--textDim)", fontWeight: 600, textTransform: "uppercase" }}>Streak</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: subj.color }}>{sess.streak}</div>
                </div>
                <div style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 14px", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, color: "var(--textDim)", fontWeight: 600, textTransform: "uppercase" }}>Total</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)" }}>{sess.totalSessions}</div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--textDim)", marginBottom: 8 }}>This Week</div>
                <StreakDots weekLog={sess.weekLog} />
              </div>

              <button
                disabled={sess.todayDone}
                onClick={() => dispatch({ type: "STUDY_CHECKIN", payload: subj.key })}
                style={{
                  width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
                  background: sess.todayDone ? "var(--cardHover)" : subj.color,
                  color: sess.todayDone ? "var(--textDim)" : "#fff",
                  fontSize: 15, fontWeight: 800, cursor: sess.todayDone ? "default" : "pointer",
                  transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                {sess.todayDone ? "✓ Completed Today!" : (<><Icons.Zap /> Check In (+50 XP)</>)}
              </button>
            </div>
          );
        })}
      </div>

      {/* Milestones */}
      <div style={{ background: "var(--card)", borderRadius: 16, padding: 22, border: "1px solid var(--border)" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginTop: 0, marginBottom: 16 }}>🏆 Milestones</h3>
        <div style={{ display: "flex", gap: 12 }}>
          {milestones.map((m, i) => {
            const achieved = totalXP >= m.xp;
            return (
              <div key={i} style={{ flex: 1, textAlign: "center", padding: 16, borderRadius: 14, background: achieved ? "var(--accent)" : "var(--bg)", border: "1px solid var(--border)", opacity: achieved ? 1 : 0.5, transition: "all 0.3s" }}>
                <div style={{ fontSize: 32, marginBottom: 6 }}>{m.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: achieved ? "#fff" : "var(--textDim)" }}>{m.label}</div>
                <div style={{ fontSize: 10, color: achieved ? "rgba(255,255,255,0.7)" : "var(--textDim)", marginTop: 2 }}>{m.xp} XP</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Auth Screen ───
function AuthScreen({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !password) { setError("Please fill in all fields"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    // For the demo version, just log in locally
    // Replace with Supabase signIn/signUp when connected:
    // import { signIn, signUp } from './lib/supabase';
    // const { user } = isLogin ? await signIn(email, password) : await signUp(email, password);
    onAuth({ email, name: email.split("@")[0] });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f0d", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: "#34d399", letterSpacing: -2 }}>△</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#e4efe8", marginTop: 8, letterSpacing: -1 }}>Zenith</div>
          <div style={{ fontSize: 14, color: "#5a7d6a", marginTop: 6 }}>Organize Everything</div>
        </div>
        <div style={{ background: "#121a16", borderRadius: 20, padding: 32, border: "1px solid #1e3328" }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#0a0f0d", borderRadius: 12, padding: 4 }}>
            <button onClick={() => { setIsLogin(true); setError(""); }} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "none", background: isLogin ? "#34d399" : "transparent", color: isLogin ? "#0a0f0d" : "#5a7d6a", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Sign In</button>
            <button onClick={() => { setIsLogin(false); setError(""); }} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "none", background: !isLogin ? "#34d399" : "transparent", color: !isLogin ? "#0a0f0d" : "#5a7d6a", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Sign Up</button>
          </div>
          {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#ef4444", marginBottom: 16 }}>{error}</div>}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#5a7d6a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" onKeyDown={e => e.key === "Enter" && handleSubmit()} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #1e3328", background: "#0e1511", color: "#e4efe8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#5a7d6a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleSubmit()} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #1e3328", background: "#0e1511", color: "#e4efe8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <button onClick={handleSubmit} style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: "#34d399", color: "#0a0f0d", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#5a7d6a" }}>
          Your data syncs across all devices
        </div>
      </div>
    </div>
  );
}


// ─── Main App ───

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, () => loadState() || defaultState);
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(() => {
    try { const u = localStorage.getItem("zenithUser"); return u ? JSON.parse(u) : null; } catch { return null; }
  });
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("zenithApp", JSON.stringify(state)); } catch {}
  }, [state]);

  const handleAuth = (userData) => {
    setUser(userData);
    try { localStorage.setItem("zenithUser", JSON.stringify(userData)); } catch {}
  };

  const handleLogout = () => {
    setUser(null);
    try { localStorage.removeItem("zenithUser"); } catch {}
  };

  if (!user) return <AuthScreen onAuth={handleAuth} />;

  const navItems = [
    { key: "dashboard", label: "Home", icon: Icons.Home },
    { key: "budget", label: "Budget", icon: Icons.Wallet },
    { key: "todos", label: "Tasks", icon: Icons.Check },
    { key: "subs", label: "Subs", icon: Icons.Repeat },
    { key: "journal", label: "Journal", icon: Icons.Pen },
    { key: "books", label: "Books", icon: Icons.Book },
    { key: "study", label: "Study", icon: Icons.Study },
  ];

  const pages = {
    dashboard: <DashboardPage state={state} dispatch={dispatch} />,
    budget: <BudgetPage state={state} dispatch={dispatch} />,
    todos: <TodoPage state={state} dispatch={dispatch} />,
    subs: <SubscriptionsPage state={state} dispatch={dispatch} />,
    journal: <JournalPage state={state} dispatch={dispatch} />,
    books: <BooksPage state={state} dispatch={dispatch} />,
    study: <StudyPage state={state} dispatch={dispatch} />,
  };

  return (
    <div style={{
      "--bg": "#0a0f0d",
      "--card": "#121a16",
      "--cardHover": "#1a2820",
      "--border": "#1e3328",
      "--text": "#e4efe8",
      "--textSoft": "#a8c4b4",
      "--textDim": "#5a7d6a",
      "--accent": "#34d399",
      "--accentAlt": "#10b981",
      "--inputBg": "#0e1511",
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "'DM Sans', 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        input:focus, select:focus, textarea:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(52,211,153,0.15); }
        button:hover { filter: brightness(1.08); }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .main-content { padding: 16px 14px 90px 14px !important; max-width: 100% !important; }
          .mobile-bottom-nav { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-bottom-nav { display: none !important; }
        }
      `}</style>

      {/* Desktop Sidebar */}
      <nav className="desktop-sidebar" style={{ width: 220, minHeight: "100vh", background: "var(--card)", borderRight: "1px solid var(--border)", padding: "24px 12px", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0 }}>
        <div style={{ padding: "0 10px", marginBottom: 32 }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "var(--accent)", letterSpacing: -0.5 }}>△ Zenith</div>
          <div style={{ fontSize: 11, color: "var(--textDim)", marginTop: 2 }}>Organize Everything</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {navItems.map(item => {
            const active = page === item.key;
            const Icon = item.icon;
            return (
              <button key={item.key} onClick={() => setPage(item.key)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, border: "none",
                background: active ? "var(--accent)" : "transparent",
                color: active ? "#0a0f0d" : "var(--textDim)",
                fontSize: 14, fontWeight: active ? 700 : 500, cursor: "pointer", transition: "all 0.2s", textAlign: "left",
              }}>
                <Icon />{item.label}
              </button>
            );
          })}
        </div>

        {/* User + XP */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: "0 6px" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#0a0f0d" }}>
              {(user.name || "U")[0].toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{user.name || user.email}</div>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "var(--textDim)", fontSize: 11, cursor: "pointer", padding: 0, fontWeight: 500 }}>Sign Out</button>
            </div>
          </div>
          <div style={{ background: "var(--bg)", borderRadius: 14, padding: "14px 16px", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Icons.Fire />
              <span style={{ fontSize: 14, fontWeight: 800, color: "var(--accent)" }}>Lv.{state.level}</span>
              <span style={{ fontSize: 12, color: "var(--textDim)" }}>{state.xp} XP</span>
            </div>
            <ProgressBar value={state.xp % 300 || 300} max={300} height={5} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: "28px 36px", maxWidth: 960, minHeight: "100vh" }}>
        {pages[page]}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav" style={{
        display: "none", position: "fixed", bottom: 0, left: 0, right: 0,
        background: "var(--card)", borderTop: "1px solid var(--border)",
        padding: "8px 4px 12px", zIndex: 100,
        justifyContent: "space-around", alignItems: "center",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      }}>
        {navItems.map(item => {
          const active = page === item.key;
          const Icon = item.icon;
          return (
            <button key={item.key} onClick={() => setPage(item.key)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              padding: "6px 8px", borderRadius: 10, border: "none",
              background: "transparent",
              color: active ? "var(--accent)" : "var(--textDim)",
              fontSize: 10, fontWeight: active ? 700 : 500, cursor: "pointer",
              transition: "all 0.2s", minWidth: 44,
            }}>
              <Icon />{item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

