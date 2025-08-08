import { PageShell } from "@/components/page-shell";

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description="Please read our terms of service carefully."
    >
      <div className="space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
        <p>By using Kinetic UI, you agree to be bound by these terms. The components are provided under the MIT License.</p>
        <h2 className="text-xl font-semibold text-white">2. Use of Components</h2>
        <p>You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the components.</p>
        <h2 className="text-xl font-semibold text-white">3. Disclaimer</h2>
        <p>The software is provided "as is", without warranty of any kind, express or implied.</p>
      </div>
    </PageShell>
  );
}
