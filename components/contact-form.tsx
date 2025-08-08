"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendTelegramMessage } from "@/app/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from 'lucide-react';

const initialState = {
  success: false,
  message: "",
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-purple-600 hover:bg-purple-700">
      {pending ? (
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
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendTelegramMessage, initialState);

  return (
    <form action={formAction} className="space-y-6">
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
          />
          {state.errors?.name && (
            <p className="text-sm text-red-400">{state.errors.name[0]}</p>
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
          />
          {state.errors?.email && (
            <p className="text-sm text-red-400">{state.errors.email[0]}</p>
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
        />
        {state.errors?.message && (
          <p className="text-sm text-red-400">{state.errors.message[0]}</p>
        )}
      </div>
      <div>
        <SubmitButton />
      </div>
      {state.message && (
        <p className={`text-sm text-center ${state.success ? 'text-green-400' : 'text-red-400'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
