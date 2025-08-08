"use client";

import { type PropData } from "@/data/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';

interface PropControlsProps {
  propDefs: PropData[];
  currentProps: { [key: string]: any };
  onPropChange: (propName: string, value: any) => void;
}

export function PropControls({ propDefs, currentProps, onPropChange }: PropControlsProps) {
  if (propDefs.length === 0) {
    return <p className="text-gray-400 text-sm">No customizable props for this component.</p>;
  }

  const renderControl = (prop: PropData) => {
    const value = currentProps[prop.name];

    switch (prop.type) {
      case "string":
      case "ReactNode":
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => onPropChange(prop.name, e.target.value)}
            className="bg-black/30 border-white/10"
          />
        );
      case "long-string":
        return (
          <Textarea
            value={value}
            onChange={(e) => onPropChange(prop.name, e.target.value)}
            className="bg-black/30 border-white/10"
            rows={3}
          />
        );
      case "color":
        return (
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={value}
              onChange={(e) => onPropChange(prop.name, e.target.value)}
              className="h-10 w-10 p-1 bg-black/30 border-white/10 cursor-pointer"
            />
            <Input
              type="text"
              value={value}
              onChange={(e) => onPropChange(prop.name, e.target.value)}
              className="bg-black/30 border-white/10"
            />
          </div>
        );
      case "string[]":
        return (
          <Textarea
            value={Array.isArray(value) ? value.join("\n") : ""}
            onChange={(e) => onPropChange(prop.name, e.target.value.split("\n"))}
            placeholder="Enter one value per line"
            className="bg-black/30 border-white/10"
            rows={4}
          />
        );
      case "number[]":
        return (
          <Input
            type="text"
            value={Array.isArray(value) ? value.join(", ") : ""}
            onChange={(e) => {
              const stringValues = e.target.value.split(",");
              const numberValues = stringValues.map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
              onPropChange(prop.name, numberValues);
            }}
            placeholder="e.g., -200, 200, -150"
            className="bg-black/30 border-white/10"
          />
        );
      case "boolean":
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={value}
              onCheckedChange={(checked) => onPropChange(prop.name, checked)}
            />
            <span className="text-sm text-gray-400">{value ? "true" : "false"}</span>
          </div>
        );
      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => onPropChange(prop.name, parseFloat(e.target.value) || 0)}
            className="bg-black/30 border-white/10"
          />
        );
      case "Tab[]":
        return (
          <div className="space-y-4">
            {(Array.isArray(value) ? value : []).map((tab, index) => (
              <div key={index} className="space-y-2 p-3 rounded-md border border-white/10 bg-black/20 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 text-gray-500 hover:text-red-500"
                  onClick={() => {
                    const newTabs = [...value];
                    newTabs.splice(index, 1);
                    onPropChange(prop.name, newTabs);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
                <div>
                  <Label className="text-xs text-gray-400">Label</Label>
                  <Input
                    type="text"
                    value={tab.label}
                    onChange={(e) => {
                      const newTabs = [...value];
                      newTabs[index] = { ...newTabs[index], label: e.target.value };
                      onPropChange(prop.name, newTabs);
                    }}
                    className="bg-black/30 border-white/10 h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-400">Content</Label>
                  <Textarea
                    value={tab.content}
                    onChange={(e) => {
                      const newTabs = [...value];
                      newTabs[index] = { ...newTabs[index], content: e.target.value };
                      onPropChange(prop.name, newTabs);
                    }}
                    className="bg-black/30 border-white/10"
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full border-dashed hover:border-solid hover:bg-white/5 hover:text-white"
              onClick={() => {
                const newTabs = [...(Array.isArray(value) ? value : []), { label: `Tab ${value.length + 1}`, content: 'New tab content.' }];
                onPropChange(prop.name, newTabs);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Tab
            </Button>
          </div>
        );
      default:
        return <p className="text-sm text-gray-500">Control not available for type: {prop.type}</p>;
    }
  };

  return (
    <div className="space-y-6">
      {propDefs.map((prop) => (
        <div key={prop.name} className="grid gap-2">
          <Label className="flex flex-col gap-1">
            <span className="font-mono text-purple-300">{prop.name}</span>
            <span className="text-xs font-normal text-gray-400">{prop.description}</span>
          </Label>
          {renderControl(prop)}
        </div>
      ))}
    </div>
  );
}
