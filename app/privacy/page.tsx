import { PageShell } from "@/components/page-shell";

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="Your privacy is important to us."
    >
      <div className="space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-white">1. Data Collection</h2>
        <p>This website does not collect any personal data from its visitors. We do not use cookies for tracking purposes.</p>
        <h2 className="text-xl font-semibold text-white">2. Component Usage</h2>
        <p>The components provided by Kinetic UI do not collect or transmit any user data.</p>
        <h2 className="text-xl font-semibold text-white">3. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
      </div>
    </PageShell>
  );
}
