"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Check, Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeViewerProps {
  code: string;
}

export function CodeViewer({ code }: CodeViewerProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Tabs defaultValue="tsx" className="w-full">
      <TabsList className="bg-black/30 border border-white/10">
        <TabsTrigger value="tsx">TSX</TabsTrigger>
      </TabsList>
      <TabsContent value="tsx">
        <div className="relative rounded-lg border border-white/10 bg-[#1E1E1E]">
          <Button
            size="icon"
            variant="ghost"
            onClick={onCopy}
            className="absolute top-2 right-2 h-8 w-8 text-white/50 hover:text-white hover:bg-white/10"
          >
            {hasCopied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            customStyle={{
              background: "transparent",
              border: "none",
              padding: "1.5rem",
              margin: 0,
              fontSize: "0.875rem",
            }}
            codeTagProps={{
                style: {
                    fontFamily: "var(--font-mono)"
                }
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      </TabsContent>
    </Tabs>
  );
}
