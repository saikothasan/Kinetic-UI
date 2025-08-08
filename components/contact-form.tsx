"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from 'lucide-react';

interface FormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormState | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormState(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setFormState(result);

      if (result.success) {
        (event.target as HTMLFormElement).reset();
      }
    } catch (error) {
      setFormState({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="bg-black/30 border-white/10"
            disabled={isLoading}
          />
          {formState?.errors?.name && (
            <p className="text-sm text-red-400">{formState.errors.name[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            className="bg-black/30 border-white/10"
            disabled={isLoading}
          />
          {formState?.errors?.email && (
            <p className="text-sm text-red-400">{formState.errors.email[0]}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="How can we help you?"
          required
          rows={5}
          className="bg-black/30 border-white/10"
          disabled={isLoading}
        />
        {formState?.errors?.message && (
          <p className="text-sm text-red-400">{formState.errors.message[0]}</p>
        )}
      </div>
      <div>
        <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </div>
      {formState?.message && (
        <p className={`mt-4 text-sm text-center ${formState.success ? 'text-green-400' : 'text-red-400'}`}>
          {formState.message}
        </p>
      )}
    </form>
  );
}
