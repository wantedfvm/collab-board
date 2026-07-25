<div align="center">
  <div style="background-color: #ffffff; width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; margin: 0 auto; border: 1px solid #e4e4e7; box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1);">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5 4 4"/><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.17 11.83a2.83 2.83 0 0 0-4-4L6 19l-4 3 3-4Z"/></svg>
  </div>
  
  # Collab-Board 🎨
  
  **A real-time multiplayer whiteboard workspace built with Next.js, Liveblocks, and Fabric.js. Features dynamic private rooms and live cursor synchronization.**
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-Play_Now-000000?style=for-the-badge&logo=vercel)](https://wantedfvm.github.io/collab-board)
</div>

<br />

## ⚡ The Engineering Challenge

Building a whiteboard is easy. Building a *multiplayer* whiteboard is hard. 
This project leverages **WebSockets (via Liveblocks)** to maintain a persistent, ultra-low-latency connection between all users.

**Technical Highlights:**
- **Dynamic Secure Rooms**: The system automatically provisions isolated, secure room hashes via the URL `?room=xyz` to prevent session collisions.
- **Live Cursors**: Mathematical interpolation of mouse movements across the network in real-time, matching other users' avatars and presence.
- **Premium UI/UX**: Custom Glassmorphism interface, Light Mode aesthetic, interactive onboarding tutorials, and robust state-driven floating toolbars.
- **Optimized Rendering**: Uses **Fabric.js** mapped to an HTML5 `<canvas>` to ensure 60 FPS rendering even when multiple users are creating geometry simultaneously.
- **Zustand State**: Micro-state management to bypass React's render cycles for the active tools.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router + Client Components + Turbopack)
- **Multiplayer Engine**: [Liveblocks](https://liveblocks.io/) (WebSockets)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Visual Engine**: HTML5 Canvas / [Fabric.js](http://fabricjs.com/)
- **Styling**: Tailwind CSS v4 (Glassmorphism & Minimalist UI)

---

## 🚀 Experience it Live

**[Click here to open the Live Demo](https://wantedfvm.github.io/collab-board)**

*Pro-tip for testing the multiplayer capabilities: Open the link in two separate windows side-by-side, or click the **Share** button inside the app to send the private link to a friend. You will see their mouse cursor move in real-time on your screen!*

---

## 💻 Running Locally

To run Collab-Board locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/wantedfvm/collab-board.git
cd collab-board
npm install
```

### Environment Setup
Create a `.env.local` file and add your Liveblocks API key:
```env
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_prod_YOUR_KEY
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
