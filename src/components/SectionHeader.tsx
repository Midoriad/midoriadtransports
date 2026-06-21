import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2
        className={`text-balance text-3xl font-extrabold sm:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`lead ${light ? "text-white/70" : ""}`}>{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
