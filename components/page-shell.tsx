import { type ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface PageShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/glowing-fluid-abstract.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/60" />

      <div className="relative z-10">
        <header className="sticky top-0 z-20 flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <div className="w-8"/> {/* Spacer */}
        </header>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
              {title}
            </h1>
            <p className="mt-4 text-lg text-gray-400">{description}</p>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
