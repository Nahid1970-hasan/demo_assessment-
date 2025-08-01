## Tech Web Application

A modern web application built using Next.js with TypeScript, React components, and Redux for state management.

---

##  Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Nahid1970-hasan/demo_assessment-.git
cd tech
```
### 2. Install Dependencies
```
npm install
```
### 3. Run the Development Server
```
npm run dev
```
📁 Project Structure
```
tech/
│
├── app/                      # Next.js 13+ App Router pages and layout
├── components/               # Reusable UI components
├── public/                   # Static assets (images, etc.)
├── store/                    # Redux Toolkit slices and store configuration
├── .github/                  # GitHub workflow or config files
├── next.config.ts            # Next.js configuration (including SEO settings)
├── eslint.config.mjs         # ESLint configuration
├── tsconfig.json             # TypeScript compiler options
├── postcss.config.mjs        # PostCSS configuration (likely used with TailwindCSS)
├── package.json              # Project metadata and scripts
└── README.md                 # Project overview (you’re reading it)
```
### Project Logic
```
Next.js App Router is used under the app/ directory, allowing layout-based routing.

Redux Toolkit is used for centralized state management (store/ folder).

Components are modular and likely built with reusability in mind.

ESLint + TypeScript ensures code quality and safety.

PostCSS config suggests integration with TailwindCSS or similar styling tools.
```
### SEO Techniques Used
```
Head Component (Dynamic Meta Tags)

In Next.js (especially with App Router), you typically define <title>, <meta name="description">, and Open Graph tags inside layout.tsx or head.tsx.

This allows per-page customization for SEO.

File-based Routing with Clean URLs

URLs are automatically clean and semantic (e.g., /about, /contact), improving crawlability.

Static Site Generation (SSG) & Server-Side Rendering (SSR)

Next.js supports getStaticProps / getServerSideProps (if using Pages Router) or layout/page-level rendering for fast-loading, SEO-friendly content.

Performance Optimizations

Built-in code splitting

Image optimization (if using next/image)

Lazy loading for components

Custom Document/Metadata

If your app includes _document.tsx or head.tsx, it's often used for global meta tags and SEO basics like viewport settings, Open Graph, Twitter Cards, etc.

Sitemap & robots.txt (optional but recommended)

These files help search engines index your site correctly.
```
