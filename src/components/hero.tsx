"use client";

import { ArrowDown, ArrowUpRight, MoveDown, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ATLAS_SRC, FoodArt, Sprite } from "./food-art";
import { BotanicalArt } from "./botanical-art";

export function Hero() {
  const [replay, setReplay] = useState(0);
  const [ready, setReady] = useState(false);
  const visual = useRef<HTMLDivElement>(null);
  // Start the plate assembly only once the ingredients can actually be drawn, so visitors
  // never watch an empty plate while the atlas downloads. A timeout keeps it from waiting forever.
  useEffect(() => {
    let settled = false;
    const start = () => {
      if (settled) return;
      settled = true;
      setReady(true);
    };
    const atlas = new window.Image();
    atlas.src = ATLAS_SRC;
    atlas.decode().then(start, start);
    const fallback = window.setTimeout(start, 2500);
    return () => {
      settled = true;
      window.clearTimeout(fallback);
    };
  }, []);
  return (
    <section id="home" className="hero stone-surface">
      <div className="hero-glow" />
      <BotanicalArt className="botanical-art-hero" />
      <div className="hero-main container">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="living-dot" />A PLANT-LED KITCHEN. A PLACE TO PAUSE.
          </div>
          <h1>
            A little wild.
            <br />A lot of <em>good.</em>
          </h1>
          <p>
            Fresh from the earth. Full of character.
            <br />
            Vegetarian food that feels as good as it tastes.
          </p>
          <div className="hero-actions">
            <a className="button" href="#menu">
              Explore our menu <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="text-link" href="#ritual">
              Discover the ritual <MoveDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-caption">
            <span className="fine-line" />
            <span>
              ROOTED IN NATURE.
              <br />
              MADE WITH INTENTION.
            </span>
          </div>
        </div>
        <div
          className="hero-visual"
          ref={visual}
          onPointerMove={(e) => {
            if (
              !visual.current ||
              e.pointerType !== "mouse" ||
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
            )
              return;
            const r = e.currentTarget.getBoundingClientRect();
            visual.current.style.setProperty(
              "--parallax-x",
              `${(e.clientX - r.left - r.width / 2) * 0.018}px`,
            );
            visual.current.style.setProperty(
              "--parallax-y",
              `${(e.clientY - r.top - r.height / 2) * 0.018}px`,
            );
          }}
          onPointerLeave={() => {
            visual.current?.style.setProperty("--parallax-x", "0px");
            visual.current?.style.setProperty("--parallax-y", "0px");
          }}
        >
          <div className="hero-food">
            <FoodArt replay={replay} ready={ready} />
            <noscript>
              <style>{".food-art-hero .ingredient-piece{animation-play-state:running!important}"}</style>
            </noscript>
          </div>
          <div className="vegetarian-seal">
            <span>GOOD BY NATURE</span>
            <strong>100%</strong>
            <span>VEGETARIAN</span>
          </div>
          <div className="hero-food-label">
            <span className="label-line" />
            <span>
              THE MARKET BOWL<small>Seasonal. Colorful. Entirely plant-based.</small>
            </span>
          </div>
          <button
            className="replay-button"
            type="button"
            onClick={() => setReplay((v) => v + 1)}
            aria-label="Replay the plate assembly animation"
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>One more ritual</span>
          </button>
        </div>
        <div className="floating-ingredient floating-basil" aria-hidden="true">
          <Sprite cell={8} />
        </div>
        <div
          className="floating-ingredient floating-tomato"
          aria-hidden="true"
          style={{ "--float-delay": "-2s" } as CSSProperties}
        >
          <Sprite cell={3} />
        </div>
      </div>
      <div className="hero-bottom container">
        <span>
          <span className="location-dot" />
          PORTLAND, OREGON
        </span>
        <a href="#ritual">
          SCROLL. SOMETHING GOOD IS GROWING.
          <ArrowDown size={15} aria-hidden="true" />
        </a>
        <span className="hero-bottom-note">A FICTIONAL PLACE. A REAL LOVE FOR FOOD.</span>
      </div>
    </section>
  );
}
