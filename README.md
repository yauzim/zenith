# △ Zenith

**A personal organization app to manage your entire life in one place.**

🔗 **Live App:** [zenith-seven-xi.vercel.app](https://zenith-seven-xi.vercel.app)

---

## What is Zenith?

Zenith is a free, all-in-one personal organization web app. It combines budgeting, task management, subscriptions, journaling, book tracking, study habits, and a wishlist into a single clean interface — accessible from any device.

Sign up, and your data syncs across your phone, tablet, and computer in real time.

---

## Features

**💰 Budget Tracker** — Log income and expenses, set a monthly budget, and see spending breakdowns by category.

**✅ To-Do List** — Create tasks with priority levels (high, medium, low), track completion progress.

**🔄 Subscriptions** — Keep track of recurring payments like Netflix, Spotify, and iCloud. See monthly and yearly totals at a glance.

**📝 Journal** — Daily mood tracking with emoji picker and reflections. See your recent mood history at the top.

**📖 Book Shelf** — Track books you're reading, completed, or want to read. Log chapter-by-chapter progress with a visual progress bar.

**📚 Study Check-in** — Duolingo-style system for Japanese and University Exam prep. Earn 50 XP per check-in, build daily streaks, and unlock milestone badges.

**🎁 Wishlist** — Add items you want to buy. The app calculates XP needed based on the price (¥100 = 10 XP). Items unlock as you earn XP from studying, and you can claim them as rewards.

**🚨 Hard Reset** — Two-step confirmation (click + type "RESET") to wipe all data and start fresh.

---

## Tech Stack

- **React** — Single-file component architecture
- **Vite** — Fast build tool and dev server
- **Supabase** — PostgreSQL database with real-time sync and Row Level Security
- **Vercel** — Deployment and hosting
- **PWA** — Installable on phone, tablet, and desktop with offline support

---

## Install on Your Phone

Zenith works as a Progressive Web App — it can be installed on your home screen and runs full-screen like a native app.

**iPhone/iPad:** Open in Safari → Share button → "Add to Home Screen"

**Android:** Open in Chrome → tap "Install" banner or menu → "Install app"

**Desktop:** Open in Chrome/Edge → click install icon in address bar

---

## Run Locally

```bash
git clone https://github.com/yauzim/zenith.git
cd zenith
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## License

This project is for personal use.
