"use client";
import Section from "../Section";

export default function Uses() {
  return (
    <Section id="uses" title="Uses" subtitle="Mi setup de trabajo.">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl p-3 ring-1" style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}>
          <h4 className="font-semibold mb-1">Hardware</h4>
          <ul className="text-sm list-disc pl-5">
            <li>ThinkPad + 32GB RAM</li>
            <li>Monitor 27” 1440p</li>
          </ul>
        </div>
        <div className="rounded-xl p-3 ring-1" style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}>
          <h4 className="font-semibold mb-1">Software</h4>
          <ul className="text-sm list-disc pl-5">
            <li>VSCode, zsh, tmux</li>
            <li>Figma, Raycast</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
