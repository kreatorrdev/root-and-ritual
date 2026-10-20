# Root & Ritual — Vegetarian Restaurant & Café

> **Project type:** Demo portfolio website (fictional restaurant)  
> **Positioning:** Restaurant websites, responsive frontend, interactive menus and reservation requests  
> **Status:** Published on Vercel; private GitHub repository connected  
> **UI language:** English  
> **Documentation language:** English

## 1. Goal and scope

Build a polished, mobile-first website for a **100% vegetarian restaurant** with a substantial selection of vegan dishes. Visitors should be able to browse the menu, filter dishes by dietary categories, learn about the restaurant and send a **reservation request**. The website must not claim to confirm a booking automatically.

**MVP includes:** a multi-section site, menu with filters and detail views, gallery, about section, opening hours, contact details, reservation request form and basic SEO.  
**Not in MVP:** customer accounts, database, real-time table availability, online payments, delivery or admin dashboard.

## 2. Brand and visual identity

| Item          | Decision                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| Brand         | Root & Ritual                                                                                          |
| Tagline       | _Rooted in nature. Made with intention._                                                               |
| Tone          | Fresh, inviting, natural, modern and editorial                                                         |
| Colors        | Charcoal `#171A17`, warm cream `#F5F0E8`, botanical lime `#D7ED91`, muted forest surfaces              |
| Typography    | Manrope with Cormorant Garamond italic accents, self-hosted through `next/font/local`                  |
| Photography   | Generated overhead vegetarian food photography and an illustrative café interior; see `docs/ASSETS.md` |
| Primary CTA   | **Explore Our Menu**                                                                                   |
| Secondary CTA | **A table for you**                                                                                    |

### Content rules

- All dishes shown must be **vegetarian**. Meat, fish, seafood, fish sauce, gelatin or meat stock must not appear in ingredients.
- The **Vegan** filter must only return dishes with no animal-derived ingredients (including dairy, eggs or honey).
- The **Gluten-free** label must reflect actual recipe ingredients; avoid claiming the restaurant is allergen-safe or cross-contamination-free.
- All displayed prices, location, hours and testimonials are illustrative; clearly label them as demo content. Do not invent real customers or reviews.

## 3. Pages and user journeys

| Page / section  | User goal                         | Main elements                                                                |
| --------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| Home / Hero     | Understand the restaurant and act | Hero photo, brand message, CTA buttons                                       |
| Menu            | Discover food                     | Category tabs, vegetarian/vegan/gluten-free filters, dish cards, prices      |
| Dish details    | Decide what to order              | Ingredients, dietary badges, allergen information, larger image              |
| About           | Learn the concept                 | Sustainability and food philosophy, photo                                    |
| Gallery         | Preview atmosphere                | Responsive image grid and accessible lightbox                                |
| Reservations    | Request a table                   | Date, time, party size, contact data, confirmation of _request only_         |
| Visit / Contact | Plan a visit                      | Fictional sample address or "location coming soon", hours, contact and links |
| Footer          | Navigate and verify details       | Menu/contact links, demo disclaimer, copyright                               |

## 4. Technical stack

| Layer            | Technology                                             | Why                                        |
| ---------------- | ------------------------------------------------------ | ------------------------------------------ |
| App and routing  | Next.js App Router                                     | Fast, modern production structure          |
| Language         | TypeScript                                             | Typed menu data and form payloads          |
| UI and layout    | React + Tailwind CSS                                   | Reusable components and responsive layouts |
| Fonts and images | `next/font`, `next/image`                              | Optimized assets                           |
| Forms            | React Hook Form + Zod                                  | Accessible input handling and validation   |
| Form delivery    | Formspree or equivalent (configured later)             | No custom backend/database required        |
| Code             | Git + GitHub                                           | Versioned source and documentation         |
| Hosting          | Vercel                                                 | Public demo                                |
| Checks           | ESLint, TypeScript, automated tests and browser review | Quality assurance                          |

**Important:** A form must never display "Reservation confirmed" unless an actual booking backend exists. Without a configured form delivery endpoint, show an explicit **Demo mode / not submitted** message.

## 5. Implementation roadmap

**Status: 18/19 complete.** R13 remains intentionally unconfigured for this portfolio demo.

### Phase A — Preparation

- [x] **R01 — Requirements:** freeze MVP features, pages and English copy. _(Markdown / planning)_
- [x] **R02 — Visual system:** establish color tokens, fonts, components and image licenses. _(Tailwind / `next/font`)_
- [x] **R03 — Initialize:** create the Next.js + TypeScript project and Git repository. _(Node.js, Next.js, Git)_
- [x] **R04 — Data modeling:** create typed menu entries, categories, ingredients and dietary tags. _(TypeScript, static seed data)_

### Phase B — Interface

- [x] **R05 — Layout:** header, mobile navigation and footer. _(React, Tailwind)_
- [x] **R06 — Hero:** responsive image, main CTA, visual hierarchy. _(React, `next/image`)_
- [x] **R07 — Menu:** cards with price, photo, category and badges. _(React, TypeScript)_
- [x] **R08 — Filtering:** dietary/category controls and clear empty states. _(React state)_
- [x] **R09 — Details:** modal or dedicated route for ingredients and allergens. _(Next.js routes or accessible dialog)_
- [x] **R10 — Editorial sections:** About, philosophy and gallery/lightbox. _(React, Tailwind)_

### Phase C — Reservation request

- [x] **R11 — Form UI:** name, email, date, preferred time, party size, optional message. _(React Hook Form)_
- [x] **R12 — Validation:** required fields, valid email, valid date/time and sensible party-size bounds. _(Zod)_
- [ ] **R13 — Form delivery:** connect a verified provider and test success/failure states; until then label demo mode. _(Formspree or equivalent)_
- [x] **R14 — Anti-spam/privacy:** honeypot or provider protection, data-minimal form, short privacy notice. _(Provider settings / copy)_

### Phase D — Quality and release

- [x] **R15 — Responsive/accessibility:** keyboard navigation, labels, focus, contrast, screen-reader descriptions. _(Tailwind, browser testing)_
- [x] **R16 — Performance/SEO:** optimize images/fonts, metadata, Open Graph, semantic headings. _(Next.js)_
- [x] **R17 — Build/testing:** lint, type/build check, test menu filters, gallery and failed form submission. _(npm scripts / manual QA)_
- [x] **R18 — Publish:** source uploaded to the private https://github.com/kreatorrdev/root-and-ritual repository and connected to the existing Vercel project. Live site: https://root-and-ritual-sooty.vercel.app. _(GitHub, Vercel)_
- [x] **R19 — Portfolio:** screenshot set, `README.md`, tech stack, demo disclaimer and case study. _(Markdown / screenshots)_

## 6. Project structure

```text
root-and-ritual/
├── public/images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/reservations/route.ts
│   ├── components/
│   ├── data/menu.ts
│   ├── lib/validation.ts
│   └── types/menu.ts
├── README.md
├── DESIGN_BRIEF.md
├── docs/
├── tests/
└── PROJECT_ROADMAP.md
```

## 7. Definition of done

- [x] Site works on narrow phones, tablets and desktop; no horizontal overflow.
- [x] Every menu item is vegetarian; vegan and gluten-free labels are consistent with ingredients.
- [x] Menu filters and gallery are usable with keyboard and touch.
- [x] Reservation form validates inputs and reports actual submission status honestly.
- [x] Demo information (reviews, fictional venue details, prices) is labeled appropriately.
- [x] `npm run lint` (if configured) and `npm run build` pass.
- [x] GitHub code, live Vercel demo, screenshots and English README are ready.

## 8. Nice-to-have after MVP (not required)

- Simple menu content management (headless CMS or typed JSON editor).
- Multilingual site, seasonal menu and "today's specials" controls.
- Real reservation/calendar backend with verified availability — only in a separate later phase.

## 9. Future work

Real reservation delivery remains an optional future integration and is not required to browse or test the portfolio demo. Future updates can be published through the connected GitHub repository.

## 10. Project decisions

- Location: Portland, Oregon, United States; an illustrative concept location.
- Currency: USD.
- Delivery: local development, Vercel publication and a private GitHub repository connected to the same Vercel project.
- The final dark visual direction is recorded in `DESIGN_BRIEF.md`.
- Four restaurant website references informed the dark visual direction, layered food assembly, scroll-driven preparation and menu reveal.
- Website copy and project documentation are in English.
- Local implementation, generated assets, tests, screenshots, English documentation, GitHub publication and Vercel integration are complete. R13 remains in explicit demo mode.
- Production URL: https://root-and-ritual-sooty.vercel.app (published October 19, 2026).
