<div align="center">
  <h1>💡 Ideas-to-Output</h1>
  <p><strong>A comprehensive, multi-modal AI workspace built to turn your creativity into reality instantly.</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Groq](https://img.shields.io/badge/Groq-AI_Models-f55036?style=for-the-badge)](https://groq.com/)
  [![Convex](https://img.shields.io/badge/Convex-Backend-ff5a00?style=for-the-badge)](https://convex.dev/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-6c47ff?style=for-the-badge)](https://clerk.com/)
</div>

---

## 🌟 What is Ideas-to-Output?

**Ideas-to-Output** (formerly Prompt-to-Things) is an all-in-one AI tooling platform. Instead of bouncing between 5 different browser tabs to write code, generate images, write a quick story, or summarize a long article—you can do it all in one cohesive dashboard. 

We utilize a combination of ultra-fast inferences from **Groq** (via advanced Llama models), dedicated open-source vision tools on **Hugging Face**, and resilient routing in **Next.js 15**. Everything is protected by **Clerk** authentication and syncs seamlessly using **Convex** for real-time data flow.

---

## 🔮 Core Features & How They Work

The web UI provides modular "tools" for distinct tasks. Every tool is backed by its own dedicated serverless endpoint (`/app/api/...`) that seamlessly bridges prompt and AI API.

### 1. 💻 Code Generation
**How to use:** Navigate to the `/code` workspace, type a prompt (e.g., "Write a Python script to scrape a website"), and get robust code back.
**How it works:** It uses `llama-3.1-8b-instant` served by Groq. The system prompts the LLM specifically to reply with isolated, syntax-formatted markdown code blocks for easy copying.

### 2. 🖼️ Image Creation
**How to use:** Go to `/image`, describe what you want to see, and watch it generate in seconds.
**How it works:** This does not rely on an LLM inference API! Instead, it cleverly pipes requests to the free, robust *Pollinations AI* rendering service, directly handling the buffer generation and returning standard image files.

### 3. 🔍 Image to Text (Vision Analysis)
**How to use:** Upload a photo in `/image-to-text` and ask a question about it.
**How it works:** The image is serialized and sent to **Groq's Multimodal Vision model** (`meta-llama/llama-4-scout-17b-16e-instruct`). The AI analyzes pixel clusters and context to "read" or describe the image accurately.

### 4. ✂️ Background Removal
**How to use:** In `/remove-background`, upload any subject image and instantly download the transparent PNG.
**How it works:** Instead of expensive APIs, the Next.js backend leverages the `@gradio/client` to hit a public **Hugging Face Space** (`not-lain/background-removal`). Given HF spaces can sleep, we handle timeout resilience gracefully to ensure it wakes up and processes the image.

### 5. ✍️ AI Writing Utilities (Story & Summarize)
**How to use:** Access `/story` for creative writing and `/summary` to condense long documents.
**How it works:** 
- **Summary** passes massive context windows to the heavy hitting `llama-3.3-70b-versatile` on Groq.
- **Story** takes advantage of the fast reasoning of `llama-3.1-8b-instant` to stream out engaging prose.

### 6. 💬 Conversational Dialogue
**How to use:** Need simple Q&A without a specific task output? Use the `/dialogue` tool.

---

## 🏛 Architecture Insights

The project embodies modern full-stack development patterns:

* **App Router Navigation:** By adhering to Next.js 15 principles, `/app/layout.jsx` wraps the application in `ConvexClientProvider` and Clerk’s unified session state.
* **Serverless Edge Ready:** AI API logic resides entirely in Next.js Serverless functions (within `/app/api/...`), completely obscuring secrets from the client.
* **Real-time DB synchronization:** Convex sync orchestrates user histories securely out of the box. 

## 🛠️ Installation & Local Setup

Want to run this toolkit on your local machine and tinker with the models? Follow along:

### 1. Requirements

Before starting, ensure you have:
* Node.js v18+ & npm/yarn/bun
* A free **Groq Api Key** ([Groq Console](https://console.groq.com/))
* A free **Clerk application** configured for user auth ([Clerk Dashboard](https://clerk.com/))
* A **Convex** deployment ([Convex Dashboard](https://dashboard.convex.dev/))

### 2. Get the code

```bash
git clone https://github.com/Shubham37204/Ideas-to-Output.git
cd Ideas-to-Output
npm install
```

### 3. Setup your Environment

Rename any `.env.example` (or create a new `.env.local` at the root) and insert your credentials.

```env
# clerk keys for Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# your convex url string
NEXT_PUBLIC_CONVEX_URL=https://your-shiny-yak.convex.cloud

# your LLM keys
GROQ_API_KEY=gsk_...
```

### 4. Fire it up

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser. Next.js hot-reloads dynamically as you tweak Tailwind classes and prompts.

---

## 🤝 Contributing

This app represents an ever-evolving Swiss-army knife for LLMs. If you discover a better HF Gradio space, alternative models (like migrating to new Llama versions), or want to patch in a new tool:

1. Fork the repo.
2. Build your feature in a new `/app/new-tool/` route and an `/app/api/new-tool/route.js`.
3. Submit a Pull Request.

---
<div align="center">
  <i>Built with ❤️ to bridge Ideas and Output.</i>
</div>
