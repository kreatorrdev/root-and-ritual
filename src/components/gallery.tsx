"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { DishPhoto } from "./dish-photo";
import { Modal } from "./modal";
import { Reveal } from "./reveal";

const gallery = [
  {
    title: "A space to stay a little.",
    image: "/images/restaurant-interior.png",
    alt: "Illustrative warm café interior with walnut tables, green seating and plants",
  },
  {
    title: "The good is in the making.",
    image: "/images/preparation.png",
    alt: "Vegetarian ingredients and a cutting board on dark slate",
  },
  {
    title: "Color. Character. A little crunch.",
    food: 0,
    alt: "Illustrative colorful vegetarian market bowl",
  },
  { title: "Mornings, made slower.", cafe: 0, alt: "Illustrative oat flat white with latte art" },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const next = (delta: number) =>
    setSelected((value) =>
      value === null ? null : (value + delta + gallery.length) % gallery.length,
    );
  const renderImage = (index: number) => {
    const item = gallery[index];
    return item.image ? (
      <Image src={item.image} alt={item.alt} fill sizes="(max-width:700px) 95vw, 60vw" />
    ) : (
      <DishPhoto
        image={{
          sheet: item.cafe !== undefined ? "cafe" : "food",
          index: item.cafe ?? item.food ?? 0,
        }}
        name={item.alt}
      />
    );
  };
  return (
    <section className="gallery-section section-pad" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <div className="eyebrow accent-text">
                <span className="section-index">04 /</span>A LITTLE LOOK AROUND
              </div>
              <h2 id="gallery-title">
                Pull up a <em>moment.</em>
              </h2>
            </div>
            <a href="#reservations" className="text-link">
              Make yourself at home
              <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>
        <div className="gallery-grid">
          {gallery.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className={`gallery-item gallery-item-${i}`}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Open gallery image: ${item.title}`}
                className="gallery-button"
              >
                {renderImage(i)}
                <span className="gallery-overlay">
                  <span>{item.title}</span>
                  <Plus size={22} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="gallery-note">
          An imagined place, brought to life with illustrative photography.
        </p>
      </div>
      {selected !== null && (
        <Modal
          className="gallery-modal"
          labelledBy="gallery-image-title"
          onClose={() => setSelected(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              next(1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              next(-1);
            }
          }}
        >
          <div className="gallery-large">{renderImage(selected)}</div>
          <div className="gallery-modal-caption">
            <h3 id="gallery-image-title">{gallery[selected].title}</h3>
            <div className="gallery-pagination">
              <button
                type="button"
                className="icon-button"
                aria-label="Previous image"
                onClick={() => next(-1)}
              >
                <ArrowLeft size={20} />
              </button>
              <span aria-live="polite">
                {selected + 1} / {gallery.length}
              </span>
              <button
                type="button"
                className="icon-button"
                aria-label="Next image"
                onClick={() => next(1)}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
