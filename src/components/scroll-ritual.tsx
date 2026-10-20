"use client";

import { ArrowDown, Leaf } from "lucide-react";
import { useEffect, useRef } from "react";
import { FoodArt, ingredients } from "./food-art";
import styles from "./scroll-ritual.module.css";

const steps = [
  { name: "Gather", text: "Good things begin in the garden.", caption: "FRESH FROM THE GARDEN" },
  { name: "Prepare", text: "A little slice. A little care.", caption: "PREPARED WITH CARE" },
  {
    name: "Roast",
    text: "A little heat brings out the good.",
    caption: "A LITTLE HEAT. A LOT OF FLAVOR.",
  },
  {
    name: "Come together",
    text: "Earth, color, and a little intention.",
    caption: "GOOD THINGS COME TOGETHER.",
  },
];

// All source positions are percentages, keeping the food inside the visual at any width.
const gathered = [
  { x: 38, y: 40, scale: 0.43, angle: -12 },
  { x: 61, y: 49, scale: 0.58, angle: -25 },
  { x: 68, y: 28, scale: 0.68, angle: 12 },
  { x: 35, y: 24, scale: 0.65, angle: -15 },
  { x: 25, y: 58, scale: 0.68, angle: -25 },
  { x: 73, y: 62, scale: 0.65, angle: 18 },
  { x: 52, y: 69, scale: 0.68, angle: -12 },
  { x: 35, y: 76, scale: 0.64, angle: 16 },
  { x: 72, y: 77, scale: 0.7, angle: 25 },
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (a: number, b: number, value: number) => {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function ScrollRitual() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pieces = Array.from(root.querySelectorAll<HTMLElement>(".ingredient-piece"));
    const plate = root.querySelector<HTMLElement>(".empty-plate");
    const food = root.querySelector<HTMLElement>(".food-art-scroll");
    const board = root.querySelector<HTMLElement>("[data-board]");
    const knife = root.querySelector<HTMLElement>("[data-knife]");
    const glow = root.querySelector<HTMLElement>("[data-heat]");
    const captions = Array.from(root.querySelectorAll<HTMLElement>("[data-caption]"));
    const stepElements = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    let frame = 0,
      lastTime = 0,
      current = 0,
      target = 0;

    const measure = () => {
      if (reduce.matches) return 1;
      const r = root.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - window.innerHeight));
    };
    const paint = (p: number) => {
      const stage = Math.min(3, Math.floor(p * 4));
      root.dataset.stage = String(stage);
      root.style.setProperty("--ritual-progress", p * 100 + "%");
      const preparation = ease(0.12, 0.43, p);
      const boardExit = ease(0.53, 0.69, p);
      const plateEntry = ease(0.61, 0.78, p);
      const heat = ease(0.4, 0.51, p) * (1 - ease(0.63, 0.74, p));
      if (board) {
        board.style.opacity = String(1 - boardExit);
        board.style.transform =
          "translateY(" +
          boardExit * 7 +
          "%) rotate(" +
          (-5 + preparation * 2) +
          "deg) scale(" +
          (1 - boardExit * 0.06) +
          ")";
      }
      if (plate) {
        plate.style.opacity = String(plateEntry);
        plate.style.clipPath = "circle(" + mix(24, 73, plateEntry) + "% at 50% 50%)";
        plate.style.transform =
          "scale(" + mix(0.92, 1, plateEntry) + ") rotate(" + mix(-5, 0, plateEntry) + "deg)";
      }
      if (glow) glow.style.opacity = String(heat * 0.65);
      if (food)
        food.style.filter =
          "saturate(" + (1 + heat * 0.12) + ") brightness(" + (1 + heat * 0.035) + ")";
      if (knife) {
        const cut = ease(0.21, 0.44, p);
        const stroke = Math.sin(cut * Math.PI * 3);
        knife.style.opacity = String(ease(0.19, 0.25, p) * (1 - ease(0.43, 0.49, p)));
        knife.style.left = mix(42, 53, cut) + "%";
        knife.style.top = 37 + stroke * 2 + "%";
        knife.style.transform = "translate(-50%,-50%) rotate(" + (25 + stroke * 7) + "deg)";
      }
      pieces.forEach((piece, index) => {
        const ingredient = ingredients[index],
          start = gathered[index];
        const plated = ease(0.59 + index * 0.012, 0.88 + index * 0.008, p);
        const x = start.x + (index % 2 ? -1.5 : 1.5) * preparation;
        const y = start.y + ((index % 3) - 1) * 1.8 * preparation;
        piece.style.left = mix(x, ingredient.x, plated) + "%";
        piece.style.top = mix(y, ingredient.y, plated) + "%";
        const angle = mix(
          start.angle + preparation * (index % 2 ? 5 : -5),
          ingredient.angle,
          plated,
        );
        piece.style.transform =
          "translate(-50%,-50%) rotate(" +
          angle +
          "deg) scale(" +
          mix(start.scale, 1, plated) +
          ")";
        piece.style.opacity = "1";
      });
      captions.forEach((caption, index) => {
        const enter = index === 0 ? 1 : ease(index / 4 - 0.025, index / 4 + 0.025, p);
        const exit = index === 3 ? 0 : ease((index + 1) / 4 - 0.025, (index + 1) / 4 + 0.025, p);
        caption.style.opacity = String(enter - exit);
        caption.style.transform = "translateY(" + (1 - enter + exit) * 5 + "px)";
      });
      stepElements.forEach((step, index) => {
        if (index === stage) step.setAttribute("aria-current", "step");
        else step.removeAttribute("aria-current");
      });
    };
    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      // Frame-rate-independent damping softens wheel and keyboard scroll jumps.
      current += (target - current) * (1 - Math.exp(-elapsed / 140));
      paint(current);
      if (Math.abs(target - current) > 0.00015) frame = window.requestAnimationFrame(tick);
      else {
        current = target;
        paint(current);
        frame = 0;
        lastTime = 0;
      }
    };
    const request = () => {
      target = measure();
      if (reduce.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        current = target;
        paint(current);
      } else if (!frame && Math.abs(target - current) > 0.00015)
        frame = window.requestAnimationFrame(tick);
    };
    current = target = measure();
    paint(current);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduce.addEventListener("change", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduce.removeEventListener("change", request);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className={styles.section + " stone-surface"}
      ref={section}
      id="ritual"
      data-stage="0"
      aria-labelledby="ritual-title"
    >
      <div className={styles.sticky + " container"}>
        <div className={styles.copy}>
          <div className="eyebrow accent-text">
            <Leaf size={14} aria-hidden="true" />
            THE GOOD IS IN THE MAKING
          </div>
          <h2 id="ritual-title">
            From the earth.
            <br />
            Into <em>your ritual.</em>
          </h2>
          <p className={styles.intro}>
            No shortcuts to something good.
            <br />
            Just beautiful ingredients, a little curiosity,
            <br />
            and care in every step.
          </p>
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li className={styles.step} key={step.name} data-step={i}>
                <span className={styles.number}>0{i + 1}</span>
                <div>
                  <h3>{step.name}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <span className={styles.invitation}>
            <ArrowDown size={14} aria-hidden="true" />
            KEEP SCROLLING. WATCH IT COME TOGETHER.
          </span>
        </div>
        <div className={styles.scene}>
          <div className={styles.canvas}>
            <div className={styles.board} data-board aria-hidden="true" />
            <div className={styles.heat} data-heat aria-hidden="true" />
            <FoodArt mode="scroll" />
            <div className={styles.knife} data-knife aria-hidden="true">
              <span className={styles.blade} />
              <span className={styles.handle} />
            </div>
          </div>
          <div className={styles.captions} aria-hidden="true">
            {steps.map((step, i) => (
              <span key={step.name} data-caption={i}>
                {step.caption}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
