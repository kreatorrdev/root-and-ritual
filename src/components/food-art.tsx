import Image from "next/image";
import type { CSSProperties } from "react";

export const ingredients = [
  { id: "greens", cell: 0, x: 49, y: 49, size: 70, angle: -17, fromX: -110, fromY: -220 },
  { id: "hummus", cell: 4, x: 48, y: 48, size: 38, angle: -36, fromX: 90, fromY: -300 },
  { id: "sweet-potato", cell: 1, x: 62, y: 37, size: 33, angle: 15, fromX: 220, fromY: -250 },
  { id: "cucumber", cell: 6, x: 37, y: 34, size: 29, angle: -25, fromX: -140, fromY: -330 },
  { id: "avocado", cell: 2, x: 34, y: 55, size: 34, angle: -18, fromX: -280, fromY: -120 },
  { id: "tomatoes", cell: 3, x: 65, y: 57, size: 32, angle: 27, fromX: 280, fromY: -160 },
  { id: "chickpeas", cell: 5, x: 53, y: 67, size: 25, angle: -14, fromX: 80, fromY: -380 },
  { id: "radish", cell: 7, x: 41, y: 70, size: 23, angle: 35, fromX: -140, fromY: -290 },
  { id: "basil", cell: 8, x: 66, y: 28, size: 19, angle: 30, fromX: 200, fromY: -400 },
];

export function Sprite({
  cell,
  className = "",
  priority = false,
}: {
  cell: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`ingredient-sprite ${className}`} aria-hidden="true">
      <Image
        src="/images/ingredients-atlas.png"
        alt=""
        width={1254}
        height={1254}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 700px) 750px, 1080px"
        className="ingredient-sheet"
        style={{ left: `${-(cell % 3) * 100}%`, top: `${-Math.floor(cell / 3) * 100}%` }}
      />
    </span>
  );
}

export function FoodArt({
  mode = "hero",
  replay = 0,
}: {
  mode?: "hero" | "scroll";
  replay?: number;
}) {
  return (
    <div
      className={`food-art food-art-${mode}`}
      key={replay}
      role="img"
      aria-label={
        mode === "hero"
          ? "An empty ceramic plate fills with greens, roasted sweet potato, avocado, hummus, tomatoes and herbs."
          : "Vegetables are prepared and brought together into a colorful vegetarian market bowl as you scroll."
      }
    >
      <div className="plate-shadow" />
      <Image
        className="empty-plate"
        src="/images/empty-plate.png"
        alt=""
        width={1254}
        height={1254}
        loading={mode === "hero" ? "eager" : "lazy"}
        fetchPriority={mode === "hero" ? "high" : "auto"}
        sizes="(max-width: 700px) 95vw, 680px"
      />
      {ingredients.map((ingredient, i) => (
        <div
          key={ingredient.id}
          className="ingredient-piece"
          data-ingredient={ingredient.id}
          style={
            {
              left: `${ingredient.x}%`,
              top: `${ingredient.y}%`,
              width: `${ingredient.size}%`,
              "--ingredient-angle": `${ingredient.angle}deg`,
              "--drop-x": `${ingredient.fromX}px`,
              "--drop-y": `${ingredient.fromY}px`,
              "--drop-delay": `${650 + i * 155}ms`,
            } as CSSProperties
          }
        >
          <Sprite cell={ingredient.cell} priority={mode === "hero"} />
        </div>
      ))}
    </div>
  );
}
