"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { type ComponentProps } from "@/data/components";
import { LivePreview } from "./live-preview";
import { CodeViewer } from "./code-viewer";
import { PropControls } from "./prop-controls";
import { Button } from "@/components/ui/button";
import { Check, LinkIcon, RotateCcw } from 'lucide-react';

function getInitialProps(propDefs: ComponentProps['props']) {
  const initialProps: { [key: string]: any } = {};
  propDefs.forEach(prop => {
    if (prop.defaultValue !== undefined) {
      // Use structuredClone for deep copy of objects/arrays
      initialProps[prop.name] = typeof prop.defaultValue === 'object' && prop.defaultValue !== null 
        ? structuredClone(prop.defaultValue) 
        : prop.defaultValue;
    } else if (prop.type.endsWith('[]')) {
      initialProps[prop.name] = [];
    } else if (prop.type === 'boolean') {
      initialProps[prop.name] = false;
    } else if (prop.type === 'number') {
      initialProps[prop.name] = 0;
    } else {
      initialProps[prop.name] = '';
    }
  });
  return initialProps;
}

function CopyLinkButton() {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="sm" onClick={onCopy} className="text-gray-400 hover:text-white">
      {hasCopied ? (
        <>
          <Check className="h-4 w-4 mr-2 text-green-400" />
          Copied!
        </>
      ) : (
        <>
          <LinkIcon className="h-4 w-4 mr-2" />
          Copy Link
        </>
      )}
    </Button>
  );
}

export function ComponentPreviewWrapper({ component }: { component: ComponentProps }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialProps = useMemo(() => {
    const propsQuery = searchParams.get('props');
    const defaultProps = getInitialProps(component.props);
    if (propsQuery) {
      try {
        const decoded = JSON.parse(atob(propsQuery));
        return { ...defaultProps, ...decoded };
      } catch (e) {
        console.error("Failed to parse props from URL", e);
      }
    }
    return defaultProps;
  }, [component.props, searchParams]);

  const [props, setProps] = useState(initialProps);

  useEffect(() => {
    setProps(initialProps);
  }, [initialProps]);

  const handlePropChange = useCallback((propName: string, value: any) => {
    const newProps = { ...props, [propName]: value };
    setProps(newProps);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    try {
      const serializedProps = btoa(JSON.stringify(newProps));
      newSearchParams.set('props', serializedProps);
      router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
    } catch (e) {
      console.error("Failed to serialize props for URL", e);
    }
  }, [props, searchParams, router, pathname]);

  const handleReset = useCallback(() => {
    const defaultProps = getInitialProps(component.props);
    setProps(defaultProps);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('props');
    const newUrl = newSearchParams.toString() ? `${pathname}?${newSearchParams.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [component.props, router, pathname, searchParams]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <main className="lg:col-span-2">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Preview</h2>
          <div className="w-full min-h-[300px] rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-8 flex items-center justify-center overflow-hidden">
            <LivePreview slug={component.slug} dynamicProps={props} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Code</h2>
          <CodeViewer code={component.code.tsx} />
        </section>
      </main>

      <aside className="lg:col-span-1">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Props</h2>
            <div className="flex items-center gap-1">
              <CopyLinkButton />
              <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-400 hover:text-white">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 backdrop-blur-md p-6">
            <PropControls
              propDefs={component.props}
              currentProps={props}
              onPropChange={handlePropChange}
            />
          </div>
        </section>
      </aside>
    </div>
  );
}
