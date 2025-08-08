import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell
      title="About Us"
      description="Learn more about the mission behind Kinetic UI."
    >
      <div className="space-y-4 text-gray-300">
        <p>
          Kinetic UI was born from a simple idea: building beautiful, animated user interfaces should be easy and fun for every developer. We believe that great design and delightful interactions are not just nice-to-haves; they are essential for creating memorable user experiences.
        </p>
        <p>
          This project is an open-source effort to provide a comprehensive library of production-ready, highly customizable React components that you can drop into your projects. We handle the complexity of animations and interactions, so you can focus on what you do best: building amazing applications.
        </p>
      </div>
    </PageShell>
  );
}
