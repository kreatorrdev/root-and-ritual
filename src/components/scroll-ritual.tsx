"use client";

import { ArrowDown, Leaf } from "lucide-react";
import { useEffect, useRef } from "react";
import { FoodArt, ingredients } from "./food-art";
import styles from "./scroll-ritual.module.css";

// One timeline drives the copy and the scene. `start` is where a step becomes current;
// `anchor` is where clicking the step lands, at a moment that clearly shows that step.
// The windows below (knife, heat, plating) are tuned to sit inside these phases.
const steps = [
  {
    name: "Gather",
    text: "Good things begin in the garden.",
    caption: "FRESH FROM THE GARDEN",
    start: 0,
    anchor: 0.06,
  },
  {
    name: "Prepare",
    text: "A little slice. A little care.",
    caption: "PREPARED WITH CARE",
    start: 0.19,
    anchor: 0.33,
  },
  {
    name: "Roast",
    text: "A little heat brings out the good.",
    caption: "A LITTLE HEAT. A LOT OF FLAVOR.",
    start: 0.45,
    anchor: 0.55,
  },
  {
    name: "Come together",
    text: "Earth, color, and a little intention.",
    caption: "GOOD THINGS COME TOGETHER.",
    start: 0.62,
    anchor: 0.98,
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
const KNIFE_X = 42;
const KNIFE_Y = 37;
const CROSSFADE = 0.02;

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (a: number, b: number, value: number) => {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const stageAt = (p: number) => {
  let stage = 0;
  steps.forEach((step, index) => {
    if (p >= step.start) stage = index;
  });
  return stage;
};

export function ScrollRitual() {
  const section = useRef<HTMLElement>(null);
  const goTo = useRef<(index: number) => void>(() => {});

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
    const stepButtons = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    let frame = 0,
      lastTime = 0,
      current = 0,
      target = 0,
      lastStage = -1,
      // Canvas width in px. Movement is painted with transforms (no layout work per frame),
      // so percentage positions are converted once per resize.
      size = food?.clientWidth ?? 0,
      // With reduced motion the scene is static; clicking a step shows that step as a still.
      pinned: number | null = null;

    const px = (percent: number) => (percent / 100) * size;
    const measure = () => {
      if (reduce.matches) return pinned ?? 1;
      const r = root.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - window.innerHeight));
    };
    const paint = (p: number) => {
      const stage = stageAt(p);
      if (stage !== lastStage) {
        lastStage = stage;
        root.dataset.stage = String(stage);
        stepButtons.forEach((button, index) => {
          if (index === stage) button.setAttribute("aria-current", "step");
          else button.removeAttribute("aria-current");
        });
      }
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
      // A filter repaints the whole composition, so it is only applied while roasting.
      if (food)
        food.style.filter =
          heat > 0.001
            ? "saturate(" + (1 + heat * 0.12) + ") brightness(" + (1 + heat * 0.035) + ")"
            : "";
      if (knife) {
        const cut = ease(0.21, 0.44, p);
        const stroke = Math.sin(cut * Math.PI * 3);
        knife.style.opacity = String(ease(0.19, 0.25, p) * (1 - ease(0.43, 0.49, p)));
        knife.style.transform =
          "translate(-50%,-50%) translate(" +
          px(mix(KNIFE_X, 53, cut) - KNIFE_X) +
          "px," +
          px(stroke * 2) +
          "px) rotate(" +
          (25 + stroke * 7) +
          "deg)";
      }
      pieces.forEach((piece, index) => {
        const ingredient = ingredients[index],
          start = gathered[index];
        const plated = ease(0.59 + index * 0.012, 0.88 + index * 0.008, p);
        const x = start.x + (index % 2 ? -1.5 : 1.5) * preparation;
        const y = start.y + ((index % 3) - 1) * 1.8 * preparation;
        // Pieces sit at their plated left/top; the offset from there is a transform.
        const dx = px(mix(x, ingredient.x, plated) - ingredient.x);
        const dy = px(mix(y, ingredient.y, plated) - ingredient.y);
        const angle = mix(
          start.angle + preparation * (index % 2 ? 5 : -5),
          ingredient.angle,
          plated,
        );
        piece.style.transform =
          "translate(-50%,-50%) translate(" +
          dx +
          "px," +
          dy +
          "px) rotate(" +
          angle +
          "deg) scale(" +
          mix(start.scale, 1, plated) +
          ")";
      });
      captions.forEach((caption, index) => {
        const begin = steps[index].start;
        const next = steps[index + 1]?.start;
        const enter = index === 0 ? 1 : ease(begin - CROSSFADE, begin + CROSSFADE, p);
        const exit = next === undefined ? 0 : ease(next - CROSSFADE, next + CROSSFADE, p);
        caption.style.opacity = String(enter - exit);
        caption.style.transform = "translateY(" + (1 - enter + exit) * 5 + "px)";
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
    goTo.current = (index) => {
      const anchor = steps[index].anchor;
      if (reduce.matches) {
        pinned = anchor;
        request();
        return;
      }
      const top = root.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(1, root.offsetHeight - window.innerHeight);
      window.scrollTo({ top: top + anchor * range, behavior: "smooth" });
    };
    const resized = new ResizeObserver(() => {
      size = food?.clientWidth ?? 0;
      paint(current);
    });
    if (food) resized.observe(food);

    current = target = measure();
    paint(current);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduce.addEventListener("change", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduce.removeEventListener("change", request);
      resized.disconnect();
      window.cancelAnimationFrame(frame);
      goTo.current = () => {};
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
              <li className={styles.step} key={step.name}>
                <button
                  type="button"
                  className={styles.stepButton}
                  data-step={i}
                  aria-current={i === 0 ? "step" : undefined}
                  onClick={() => goTo.current(i)}
                >
                  <span className={styles.number}>0{i + 1}</span>
                  <span className={styles.stepCopy}>
                    <span className={styles.stepName}>{step.name}</span>
                    <span className={styles.stepText}>{step.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className={styles.hints}>
            <span className={styles.invitation}>
              <ArrowDown size={14} aria-hidden="true" />
              KEEP SCROLLING. WATCH IT COME TOGETHER.
            </span>
            <a className={styles.skip} href="#menu">
              Skip to the menu
            </a>
          </div>
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
