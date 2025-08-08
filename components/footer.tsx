import Link from "next/link";
import { Code, Github, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Code className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Kinetic UI</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              An open-source library of animated, interactive, and customizable React components.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://github.com/saikothasan/Kinetic-UI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://t.me/drkingbd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Send className="h-6 w-6" />
                <span className="sr-only">Telegram</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Components</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/#showcase" className="text-sm text-gray-400 hover:text-white">Browse All</Link></li>
                <li><Link href="/components/shiny-button" className="text-sm text-gray-400 hover:text-white">Buttons</Link></li>
                <li><Link href="/components/floating-card" className="text-sm text-gray-400 hover:text-white">Cards</Link></li>
                <li><Link href="/components/aurora-background" className="text-sm text-gray-400 hover:text-white">Backgrounds</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Project</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/docs" className="text-sm text-gray-400 hover:text-white">Docs</Link></li>
                <li><Link href="/showcase" className="text-sm text-gray-400 hover:text-white">Showcase</Link></li>
                <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Kinetic UI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
