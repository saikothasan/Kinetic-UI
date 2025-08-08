"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { componentsData } from "@/data/components"; // Updated import
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Code, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounce } from "@/lib/hooks/use-debounce";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set("q", debouncedSearchTerm);
    } else {
      params.delete("q");
    }
    
    if (params.get('q') !== searchParams.get('q')) {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  const filteredAndGroupedComponents = useMemo(() => {
    const filtered = componentsData.filter(component =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, component) => {
        const { category } = component;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(component);
        return acc;
    }, {} as Record<string, typeof componentsData>);
  }, [searchTerm]);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/10 bg-black/30"
    >
      <SidebarHeader className="p-4 flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <Code className="h-6 w-6 text-purple-400" />
          <span className="text-lg font-bold text-white">React Bits</span>
        </Link>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-data-[collapsible=icon]:left-1/2 group-data-[collapsible=icon]:-translate-x-1/2" />
            <Input 
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black/30 border-white/10 rounded-full pl-9 group-data-[collapsible=icon]:hidden"
            />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <AnimatePresence>
          {Object.keys(filteredAndGroupedComponents).length > 0 ? (
            Object.entries(filteredAndGroupedComponents).map(([category, components]) => (
              <SidebarGroup key={category}>
                <SidebarGroupLabel>{category}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {components.map((component) => (
                      <motion.div
                        key={component.slug}
                        layout
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.15 }}
                      >
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === `/components/${component.slug}`}
                            tooltip={{
                              children: component.name,
                              side: "right",
                              align: "center",
                            }}
                          >
                            <Link href={`/components/${component.slug}`}>
                              <span>{component.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </motion.div>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 text-center text-sm text-gray-500 group-data-[collapsible=icon]:hidden"
            >
              No components found.
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarContent>
    </Sidebar>
  );
}
