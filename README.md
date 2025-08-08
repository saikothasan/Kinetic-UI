# Kinetic UI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.3%2B-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6%2B-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-cyan?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10-purple?logo=framer)](https://www.framer.com/motion/)

<p align="center">
  <img src="public/og-image.png" alt="Kinetic UI Hero Image" width="700" />
</p>

**Kinetic UI** is a modern, open-source library of 100+ animated, interactive, and customizable React components, built with the latest web technologies. It's designed for developers who want to add flair and delight to their web applications with minimal effort.

## ✨ Features

-   **Extensive Component Library**: Over 100 components, from buttons and cards to complex backgrounds and interactive effects.
-   **Animation-First**: Built with Framer Motion for smooth, performant, and beautiful animations.
-   **Highly Customizable**: Easily tweak props, colors, and styles to fit your brand.
-   **Live Previews**: Interact with components and see your changes in real-time in the documentation.
-   **Code at your Fingertips**: One-click copy-to-clipboard for every component.
-   **Developer-Centric**: Built with Next.js 15, React 19, and TypeScript for a best-in-class developer experience.
-   **Dark Mode as Default**: A sleek, modern dark theme that's easy on the eyes.
-   **Fully Responsive**: Components are designed to work beautifully on all screen sizes.
-   **Search & Filtering**: Quickly find the component you need with a powerful command palette and category filters.

## 🚀 Tech Stack

-   **Framework**: [Next.js 15.3+](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript 5.6+](https://www.typescriptlang.org/)
-   **UI Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Deployment**: [Vercel](https://vercel.com/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18.17 or later)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    \`\`\`sh
    git clone https://github.com/saikothasan/Kinetic-UI.git
    \`\`\`
2.  Navigate to the project directory:
    \`\`\`sh
    cd kinetic-ui
    \`\`\`
3.  Install dependencies:
    \`\`\`sh
    npm install
    \`\`\`
4.  Run the development server:
    \`\`\`sh
    npm run dev
    \`\`\`
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

The project follows a standard Next.js App Router structure, with components organized for clarity and scalability.

\`\`\`
src/
├── app/
│   ├── (main)/             # Main application routes
│   │   ├── components/
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Component detail page
│   │   └── page.tsx          # Homepage
│   ├── globals.css
│   └── layout.tsx          # Root layout
├── components/
│   ├── library/            # Individual React components
│   ├── ui/                 # shadcn/ui components
│   └── ...                 # Other shared UI components
├── data/
│   ├── components/         # Data, code, and props for each library component
│   └── types.ts            # TypeScript types
└── lib/
    ├── hooks/              # Custom React hooks
    └── utils.ts            # Utility functions
\`\`\`

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
