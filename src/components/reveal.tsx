"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  instant = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Skip the entrance; for content that appears in response to the visitor's own action. */
  instant?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Read once on mount: content already on screen should never re-run its entrance.
  const skip = useRef(instant);
  useEffect(() => {
    const el = ref.current;
    if (!el || skip.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.motion = "ready";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
