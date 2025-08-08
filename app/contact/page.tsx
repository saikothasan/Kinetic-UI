import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      description="Have questions or want to get in touch? Fill out the form below."
    >
      <div className="max-w-xl mx-auto">
        <ContactForm />
      </div>
    </PageShell>
  );
}
