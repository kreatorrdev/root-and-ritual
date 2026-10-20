import Image from "next/image";
import type { Dish } from "@/types/menu";
import { Sprite } from "./food-art";

export function DishPhoto({
  image,
  name,
  className = "",
}: {
  image: Dish["image"];
  name: string;
  className?: string;
}) {
  if (image.sheet === "ingredient")
    return (
      <div
        className={`dish-photo ingredient-dish ${className}`}
        role="img"
        aria-label={`Illustrative ${name}`}
      >
        <div className="small-plate" />
        <Sprite cell={image.index} />
      </div>
    );
  const columns = image.sheet === "food" ? 3 : 2;
  // Overscan each photographic cell to hide small differences in the generated sheet's gutters.
  return (
    <div className={`dish-photo ${className}`}>
      <div className="dish-cell">
        <Image
          src={image.sheet === "food" ? "/images/menu-grid.png" : "/images/cafe-grid.png"}
          alt={name.startsWith("Illustrative") ? name : `Illustrative ${name}`}
          width={1536}
          height={image.sheet === "food" ? 1024 : 1536}
          className="dish-sheet"
          sizes="(max-width: 600px) 1400px, (max-width: 1000px) 1500px, 1300px"
          style={{
            width: `${columns * 100}%`,
            height: "210%",
            left: `${-(image.index % columns) * 100}%`,
            top: `${-Math.floor(image.index / columns) * 110}%`,
          }}
        />
      </div>
    </div>
  );
}
