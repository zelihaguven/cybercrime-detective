# Detective Game — Cybercrime Investigation

A narrative detective game where you investigate real-world digital crimes. Play as a cyber detective, examine crime scenes, collect evidence, and identify what went wrong — built to make cybersecurity concepts tangible and engaging.

**Live demo:** [https://detective-game.onrender.com](https://cybercrime-detective.onrender.com)

---

## What it is

You are a detective at a cybercrime unit. Each case drops you into a real-world scenario — a grandmother who lost money to a fake SMS, a teenager whose Discord account was hijacked, a company hit by ransomware from a USB drive left in a parking lot. You explore interactive crime scenes, click on hotspots to collect clues, pin evidence to a board, then make your final accusation by identifying the attack vector.

The game is designed to teach cybersecurity literacy through story — not multiple-choice quizzes, but investigation.

---

## Cases

| # | Title | Attack Type | Difficulty |
|---|-------|-------------|------------|
| 1 | The Morning Message | SMS Phishing (Smishing) | Easy |
| 2 | Link in the Chat | Credential Phishing | Easy |
| 3 | The Creative Compromise | Credential Stuffing | Medium |
| 4 | Wednesday Morning Crisis | Ransomware (USB Drop Attack) | Medium |
| 5 | The Exam That Never Happened | DDoS / Booter Service | Medium |
| 6 | The Midnight Heist | Spear Phishing (CEO Impersonation) | Hard |
| 7 | The Leaked Exam | Unauthorised Data Access | Hard |
| 8 | The Fake Webshop | E-Commerce Fraud | Hard |
| 9 | The Voice That Wasn't Hers | AI Voice Fraud | Hard |
| 10 | The Free Poster | QR Code Phishing | Hard |

---

## Features

- **Interactive crime scenes** — click hotspots hidden inside illustrated locations (kitchen, gaming room, school IT room, tech startup office, home office) to discover clues
- **Evidence board** — collected clues are pinned to a board; you can read your detective's analysis of each one
- **Cybersecurity handbook** — each case includes a glossary of relevant terms with plain-English explanations and real-world analogies
- **Detective creation** — customize your detective's name, appearance, specialty (Digital Forensics, Social Engineering, Cybersecurity, Field Investigation), and badge
- **XP and rank system** — earn XP for solving cases and finding bonus clues; progress from Junior Investigator to Chief Investigator
- **Achievement badges** — earn badges for finding all clues, completing all cases, or reaching XP milestones
- **Multiplayer mode** — create or join a room with a 4-digit code and race other players through the same case in real time
- **Three languages** — English, German, and Turkish, togglable mid-session

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS |
| Realtime / Multiplayer | Socket.io (client + server) |
| Backend | Node.js, Express |
| Database | Supabase |
| Deployment | Render |

---

## Running locally

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/your-username/detective-game.git
cd detective-game

# Install frontend dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Set up environment
cp .env.example .env
# Edit .env and set VITE_SERVER_URL=http://localhost:3001

# Start the backend (in one terminal)
npm start

# Start the frontend dev server (in another terminal)
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project structure

```
src/
  components/       # All React screens and UI components
    multiplayer/    # Multiplayer lobby, game, and result screens
  data/
    levels.ts       # All 10 cases (English)
    levels.de.ts    # German translations
    levels.tr.ts    # Turkish translations
    characters.ts   # NPC character definitions
    badges.ts       # Badge definitions and unlock logic
  contexts/         # React context for game state
  hooks/            # Custom hooks
  i18n/             # UI string translations
  types/            # TypeScript types
server/
  index.js          # Express + Socket.io server (multiplayer rooms)
```

---

## Characters

- **Chief Inspector Weber** — Head of the Cybercrime Division. Assigns cases and delivers the final verdict.
- **Analyst Mia** — Digital Forensics Specialist. Provides technical context and traces attacks.
- **Officer Jonas** — Field Evidence Officer. Secures the scene and liaises with victims.

---

## Deployment

The project includes a `render.yaml` for one-click deployment to [Render](https://render.com). The same Node server serves both the built frontend and the Socket.io multiplayer backend.

```yaml
buildCommand: npm install && npm run build
startCommand: node server/index.js
```

---

## License

MIT



