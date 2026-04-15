"use client";

type WaveTitleProps = {
  as?: "h1" | "h2" | "h3" | "span";
  text: string;
  className?: string;
};

export default function WaveTitle({
  as: Tag = "h2",
  text,
  className = "",
}: WaveTitleProps) {
  return <Tag className={className}>{text}</Tag>;
}
