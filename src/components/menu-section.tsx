"use client";

import { ArrowDown, ArrowUpRight, Check, Leaf, SlidersHorizontal, WheatOff } from "lucide-react";
import { useState } from "react";
import { flushSync } from "react-dom";
import { categories, dietaryFilters, filterMenu, formatPrice, menu } from "@/data/menu";
import type { Category, Dietary, Dish } from "@/types/menu";
import { DishPhoto } from "./dish-photo";
import { Modal } from "./modal";
import { Reveal } from "./reveal";

// Filtering morphs the grid instead of rebuilding it: cards that stay slide to their new
// place, the rest fade. Falls back to an instant update where unsupported or motion is reduced.
function morph(update: () => void) {
  if (
    typeof document.startViewTransition !== "function" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}

export function MenuSection() {
  const [category, setCategory] = useState<Category>("All");
  const [dietary, setDietary] = useState<Dietary>("All vegetarian");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Dish | null>(null);
  // After the first filter or expand, newly shown cards appear without a scroll entrance.
  const [interacted, setInteracted] = useState(false);
  const change = (update: () => void) =>
    morph(() => {
      update();
      setInteracted(true);
    });
  const filtered = filterMenu(menu, category, dietary);
  const visible =
    expanded || category !== "All" || dietary !== "All vegetarian"
      ? filtered
      : filtered.slice(0, 6);
  return (
    <section className="menu-section section-pad" id="menu" aria-labelledby="menu-title">
      <div className="container">
        <Reveal>
          <div className="section-heading menu-heading">
            <div>
              <div className="eyebrow accent-text">
                <span className="section-index">02 /</span>SEASONAL BY NATURE
              </div>
              <h2 id="menu-title">
                Follow your <em>appetite.</em>
              </h2>
            </div>
            <p>
              Plants at the heart of every plate.
              <br />
              Good things, from first bite to last sip.
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="menu-controls">
            <div className="category-filters" role="group" aria-label="Menu category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "active" : ""}
                  aria-pressed={category === item}
                  onClick={() =>
                    change(() => {
                      setCategory(item);
                      setExpanded(true);
                    })
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="dietary-filters" role="group" aria-label="Dietary preference">
              <SlidersHorizontal size={14} aria-hidden="true" />
              {dietaryFilters.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={dietary === item}
                  className={dietary === item ? "active" : ""}
                  onClick={() =>
                    change(() => {
                      setDietary(item);
                      setExpanded(true);
                    })
                  }
                >
                  {item === "All vegetarian" ? "All" : item}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <p className="menu-result sr-only" aria-live="polite">
          Showing {visible.length} of {filtered.length} dishes. {category}. {dietary}.
        </p>
        <div className="menu-grid">
          {visible.map((dish, i) => (
            <Reveal key={dish.id} delay={Math.min((i % 3) * 95, 190)} instant={interacted}>
              <button
                type="button"
                className="dish-card"
                style={{ viewTransitionName: `dish-${dish.id}` }}
                onClick={() => setSelected(dish)}
                aria-label={`View ${dish.name}, ${formatPrice(dish.price)}, ingredients and allergens`}
              >
                <div className="dish-card-image">
                  <DishPhoto image={dish.image} name={dish.name} />
                  {dish.featured && (
                    <span className="dish-featured">
                      <Leaf size={11} aria-hidden="true" />
                      THE SIGNATURE
                    </span>
                  )}
                  <span className="dish-open" aria-hidden="true">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div className="dish-title-row">
                  <h3>{dish.name}</h3>
                  <span className="dish-price">{formatPrice(dish.price)}</span>
                </div>
                <p>{dish.description}</p>
                <div className="dish-tags">
                  <span>
                    <Leaf size={11} aria-hidden="true" />
                    {dish.vegan ? "VEGAN" : "VEGETARIAN"}
                  </span>
                  {dish.glutenFree && (
                    <span>
                      <WheatOff size={11} aria-hidden="true" />
                      GF INGREDIENTS
                    </span>
                  )}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        {visible.length === 0 && (
          <div className="empty-menu">
            <Leaf size={32} strokeWidth={1} />
            <h3>A different kind of good?</h3>
            <p>No dishes match this combination just now.</p>
            <button
              className="button button-outline"
              type="button"
              onClick={() =>
                change(() => {
                  setCategory("All");
                  setDietary("All vegetarian");
                })
              }
            >
              Explore all dishes
            </button>
          </div>
        )}
        <Reveal>
          <div className="menu-bottom">
            {category === "All" && dietary === "All vegetarian" && (
              <button
                className="button button-outline"
                type="button"
                onClick={() => change(() => setExpanded(!expanded))}
              >
                {expanded ? "A little less" : "The whole good menu"}
                <ArrowDown size={16} className={expanded ? "rotate-180" : ""} aria-hidden="true" />
              </button>
            )}
            <p>
              Illustrative menu · prices in USD · taxes not included.
              <br />
              Gluten-free describes ingredients; our shared kitchen is not allergen-free.
            </p>
          </div>
        </Reveal>
      </div>
      {selected && (
        <Modal
          onClose={() => setSelected(null)}
          labelledBy="dish-detail-title"
          className="dish-modal"
        >
          <DishPhoto image={selected.image} name={selected.name} />
          <div className="dish-detail-copy">
            <div className="eyebrow accent-text">{selected.category}</div>
            <div className="dish-title-row">
              <h2 id="dish-detail-title">{selected.name}</h2>
              <span>{formatPrice(selected.price)}</span>
            </div>
            <p>{selected.description}</p>
            <div className="detail-badges">
              <span>
                <Check size={13} />
                {selected.vegan ? "Vegan" : "Vegetarian"}
              </span>
              {selected.glutenFree && (
                <span>
                  <Check size={13} />
                  Gluten-free ingredients
                </span>
              )}
            </div>
            <h3>Good things inside</h3>
            <p>{selected.ingredients.join(" · ")}</p>
            <h3>Allergen information</h3>
            <p>
              {selected.allergens.length
                ? `Contains ${selected.allergens.join(", ").toLowerCase()}.`
                : "No major US allergens listed in this sample recipe."}{" "}
              Prepared in a shared kitchen; cross-contact may occur. Please discuss allergies with
              the team.
            </p>
            <p className="detail-disclaimer">
              Illustrative recipe and price for this fictional restaurant.
            </p>
            <a className="button" href="#reservations" onClick={() => setSelected(null)}>
              A table for this? <ArrowUpRight size={16} />
            </a>
          </div>
        </Modal>
      )}
    </section>
  );
}
