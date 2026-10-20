import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Coffee,
  Heart,
  Leaf,
  MapPin,
  Sprout,
} from "lucide-react";
import { Brand, Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ScrollRitual } from "@/components/scroll-ritual";
import { MenuSection } from "@/components/menu-section";
import { Reveal } from "@/components/reveal";
import { Gallery } from "@/components/gallery";
import { ReservationForm } from "@/components/reservation-form";

export default function Home() {
  const demo = !process.env.RESERVATION_FORM_ENDPOINT;
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <div className="values-ribbon" aria-label="Our food philosophy">
          <div className="container">
            <span>
              <Sprout size={18} strokeWidth={1.5} />
              Plants come first
            </span>
            <span>
              <Leaf size={18} strokeWidth={1.5} />
              Seasonal by nature
            </span>
            <span>
              <Coffee size={18} strokeWidth={1.5} />
              Slow coffee, good company
            </span>
            <span>
              <Heart size={18} strokeWidth={1.5} />
              Made with intention
            </span>
          </div>
        </div>
        <ScrollRitual />
        <MenuSection />
        <section
          className="story-section section-pad stone-surface"
          id="story"
          aria-labelledby="story-title"
        >
          <div className="container story-layout">
            <Reveal className="story-image">
              <Image
                src="/images/preparation.png"
                alt="Illustrative vegetables, herbs and a cutting board on a charcoal kitchen counter"
                fill
                sizes="(max-width:700px) 95vw, 50vw"
              />
              <span className="story-image-caption">LESS RUSH. MORE RITUAL.</span>
            </Reveal>
            <Reveal delay={120} className="story-copy">
              <div className="eyebrow accent-text">
                <span className="section-index">03 /</span>OUR ROOTS RUN DEEP
              </div>
              <h2 id="story-title">
                Good food.
                <br />A better kind
                <br />
                of <em>everyday.</em>
              </h2>
              <p>
                We like our vegetables a little imperfect, our tables a little full, and our
                mornings a little slower.
              </p>
              <p>
                Root &amp; Ritual imagines a neighborhood kitchen where plants lead the way.
                Familiar ingredients, unexpected little touches, and food that gives you a reason to
                pause.
              </p>
              <div className="story-signature">
                <Sprout size={32} strokeWidth={1} />
                <span>
                  Rooted in nature.
                  <br />
                  <em>Made with intention.</em>
                </span>
              </div>
              <a href="#visit" className="text-link">
                Find your little corner
                <ArrowUpRight size={17} />
              </a>
            </Reveal>
          </div>
        </section>
        <Gallery />
        <section
          className="reservations-section section-pad"
          id="reservations"
          aria-labelledby="reservation-title"
        >
          <div className="container reservation-layout">
            <Reveal className="reservation-copy">
              <div className="eyebrow accent-text">
                <span className="section-index">05 /</span>SAVE A LITTLE TIME FOR GOOD
              </div>
              <h2 id="reservation-title">
                Your people.
                <br />
                Our table.
                <br />
                <em>Good things.</em>
              </h2>
              <p>
                A long lunch, a quiet coffee, a reason to celebrate. There is always room for a
                little ritual.
              </p>
              <div className="reservation-illustration" aria-hidden="true">
                <span>COME AS YOU ARE</span>
                <ArrowDownRight strokeWidth={0.75} />
              </div>
              <p className="demo-caption">
                A fictional restaurant. An honest demo.
                <br />
                Try a table request — no booking is made.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ReservationForm demo={demo} />
            </Reveal>
          </div>
        </section>
        <section className="visit-section stone-surface" id="visit" aria-labelledby="visit-title">
          <div className="container visit-layout">
            <Reveal>
              <div className="eyebrow accent-text">SOMEWHERE GOOD TO LAND</div>
              <h2 id="visit-title">
                See you
                <br />
                <em>around the table.</em>
              </h2>
              <p>
                Portland, Oregon
                <span className="visit-demo">Concept location · exact address coming soon</span>
              </p>
              <div className="visit-details">
                <div>
                  <Clock3 size={17} />
                  <div>
                    <h3>Kitchen hours</h3>
                    <p>
                      Tue–Thu · 11 am–9 pm
                      <br />
                      Fri–Sat · 11 am–10 pm
                      <br />
                      Sunday · 10 am–8 pm
                      <br />
                      Monday · A little rest
                    </p>
                    <small>Illustrative hours · Pacific Time</small>
                  </div>
                </div>
                <div>
                  <MapPin size={17} />
                  <div>
                    <h3>Rooted in Portland</h3>
                    <p>
                      An imagined neighborhood kitchen
                      <br />
                      in the Pacific Northwest.
                    </p>
                    <span className="visit-contact">hello@rootandritual.example</span>
                    <small>Sample email · not monitored</small>
                  </div>
                </div>
              </div>
              <a href="#reservations" className="button">
                A table for you <ArrowUpRight size={17} />
              </a>
            </Reveal>
            <Reveal delay={100} className="visit-photo">
              <Image
                src="/images/restaurant-interior.png"
                alt="Illustrative neighborhood café with warm walnut tables and plants"
                fill
                sizes="(max-width:700px) 95vw, 50vw"
              />
              <div className="visit-photo-label">
                <span>ROOT &amp; RITUAL</span>
                <span>A LITTLE ROOM TO PAUSE.</span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Brand footer />
          <p>A little wild. A lot of good.</p>
          <a href="#home" className="back-top" aria-label="Back to top">
            <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Root &amp; Ritual</span>
          <nav aria-label="Footer navigation">
            <a href="#menu">The menu</a>
            <a href="#story">Our roots</a>
            <a href="#reservations">A table for you</a>
          </nav>
          <span>Fictional restaurant · portfolio demo</span>
        </div>
      </footer>
    </>
  );
}
