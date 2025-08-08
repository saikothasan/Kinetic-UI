import { notFound } from "next/navigation";
import { componentsData } from "@/data/components";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import { ComponentPreviewWrapper } from "@/components/component-preview-wrapper";
import { SidebarTrigger } from "@/components/ui/sidebar";

export async function generateStaticParams() {
  return componentsData.map((component) => ({
    slug: component.slug,
  }));
}

export default function ComponentPage({ params }: { params: { slug: string } }) {
  const component = componentsData.find((c) => c.slug === params.slug);

  if (!component) {
    notFound();
  }

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
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">{component.name}</h1>
          <div className="w-8"/> {/* Spacer */}
        </header>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ComponentPreviewWrapper component={component} />
        </div>
      </div>
    </div>
  );
}
