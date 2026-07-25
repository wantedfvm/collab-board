<div align="center">
  <div style="background-color: #000; width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; margin: 0 auto; border: 1px solid #333;">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  </div>
  
  # Collab-Board 🎨
  
  **A real-time multiplayer whiteboard built for modern engineering and design teams.**
  
  Collab-Board is an infinite canvas application inspired by Miro and Figma. It features real-time cursor tracking, live shape synchronization, and a premium Glassmorphism interface.
</div>

<br />

## ⚡ The Multiplayer Engine

This project leverages **WebSockets** via **Liveblocks** to maintain a persistent, low-latency connection between all users in a room. 

**Technical Highlights:**
- **Live Cursors**: Mathematical interpolation of mouse movements across the network.
- **Conflict Resolution**: Real-time state synchronization for shape creation, dragging, and resizing without race conditions.
- **Optimized Rendering**: Uses HTML5 `<canvas>` (via Fabric.js) instead of the DOM for rendering hundreds of elements at 60 FPS.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Multiplayer / WebSockets**: [Liveblocks](https://liveblocks.io/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Visual Engine**: HTML5 Canvas / Fabric.js
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## ✨ Core Features

- **Infinite Canvas**: Pan and zoom across an infinite workspace.
- **Live Collaboration**: See exactly what your teammates are selecting and drawing instantly.
- **Premium UI**: Floating toolbars with Glassmorphism effects and smooth Framer Motion transitions.
- **Keyboard Shortcuts**: Native app feel with shortcut support (`V` for select, `R` for rectangle, etc.).

---

## 🚀 Getting Started

To run Collab-Board locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/wantedfvm/collab-board.git
cd collab-board
npm install
```

### Environment Setup
Create a `.env.local` file and add your Liveblocks API key:
```env
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_prod_...
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 About the Project

This project was built as a portfolio piece to demonstrate mastery over real-time WebSockets, complex state synchronization, and high-performance Canvas rendering in React.
