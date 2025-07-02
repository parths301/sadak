# 🎯 Parth's GMAT Roadmap

This is a fully interactive and modern GMAT preparation roadmap website hosted using GitHub Pages. Built with HTML/CSS/JS, it includes:

- ✅ 30-day Kanban board with topic-linked cards
- ⏳ Countdown to GMAT target date
- 📅 FullCalendar integration for visual scheduling
- 🎥 Video walkthroughs for each topic via YouTube
- 📚 [Question Bank](question_bank.html) with 30 GMAT-style problems

---

## 🚀 Live Preview

Host via GitHub Pages:

1. Go to your GitHub repository.
2. Click **Settings > Pages**.
3. Select branch: `main` and root folder `/` (or `docs/` if moved).
4. Your site will be live at: `https://<your-username>.github.io/sadak/`

---

## 🛠 File Structure

| File | Purpose |
|------|---------|
| `index.html` | Main Kanban board |
| `styles.css` | Theme and layout |
| `scripts.js` | Interactivity, countdown, modals |
| `question_bank.html` | GMAT sample questions |

---

## 🔁 Local Editing

Clone and run locally:

```bash
git clone https://github.com/<your-username>/sadak.git
cd sadak
open index.html
```

---

## 🌐 Webhook Integration (Optional with n8n)

You can add backend task logging or feedback collection by connecting this site to [n8n](https://n8n.io) cloud:

1. Go to [n8n Cloud](https://cloud.n8n.io)
2. Create a new workflow:
    - Trigger: Webhook
    - Action: Google Sheets → append data
3. Copy the webhook URL and embed in `scripts.js`:

```js
fetch("https://your-n8n-url.webhook/", {
  method: "POST",
  body: JSON.stringify({ task: title, date: Date.now() }),
  headers: { "Content-Type": "application/json" }
});
```

You can trigger this inside `showModal()` or on task completion.

---

## 💡 Credits

Built by [Parth Sharma](https://www.linkedin.com/in/parth-sharma-sls/)

Uses:
- [FullCalendar](https://fullcalendar.io/)
- YouTube embeds
- Vanilla JS + GitHub Pages

---

Good luck with GMAT! 💪
