"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// Telegram's MarkdownV2 requires escaping certain characters
function escapeMarkdownV2(text: string): string {
  const charsToEscape = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
  return text.split('').map(char => charsToEscape.includes(char) ? `\\${char}` : char).join('');
}

export async function sendTelegramMessage(prevState: any, formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data. Please check your entries.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram Bot Token or Chat ID is not configured.");
    return {
      success: false,
      message: "Server configuration error. Could not send message.",
    };
  }

  const text = `
*New Contact Form Submission*

*Name:* ${escapeMarkdownV2(name)}
*Email:* ${escapeMarkdownV2(email)}

*Message:*
${escapeMarkdownV2(message)}
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "MarkdownV2",
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API Error:", result);
      return {
        success: false,
        message: "Failed to send message. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
