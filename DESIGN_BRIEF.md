# Root & Ritual — Design Brief

## Project overview

Root & Ritual is a fictional vegetarian restaurant and café in Portland, Oregon, created as a frontend portfolio project. The website introduces the restaurant concept, presents an interactive seasonal menu and demonstrates a clearly labeled reservation preview. Website copy and project documentation are in English. Menu prices are in US dollars.

**Live demo:** https://root-and-ritual-sooty.vercel.app

## Visual direction

The design takes inspiration from [Kitchen Remedy](https://www.kitchen-remedy.com.au/), pairing deep forest green with pale mint typography, warm paper surfaces and copper details. Charcoal black anchors the divider ribbon, menu, scrolled navigation and footer. Original botanical line art and outlined pill buttons create a more relaxed café atmosphere. Colorful overhead food photography remains the main visual focus.

| Element            | Specification                                                             |
| ------------------ | ------------------------------------------------------------------------- |
| Primary background | Deep forest green `#024B34`                                               |
| Main text          | Warm cream `#F4EFE5`                                                      |
| Accent             | Pale mint `#CBE5D8` and copper `#DFB28B`                                  |
| Secondary surfaces | Muted forest tones                                                        |
| Main typeface      | Wix Madefor Display, self-hosted through `next/font/local`                |
| Editorial accents  | Hanken Grotesk for body copy and labels                                   |
| Photography        | Overhead vegetarian dishes, ingredients and an illustrative café interior |
| Primary action     | Explore our menu                                                          |
| Secondary action   | A table for you                                                           |

## Motion and interaction

The opening scene begins with an empty dark ceramic plate. Nine independent ingredient layers arrive in sequence to create a colorful market bowl. A replay control lets visitors watch the assembly again, while subtle pointer movement adds depth on desktop.

A scroll-driven preparation sequence follows four stages: Gather, Prepare, Roast and Come together. Damped progress and staggered transitions move the ingredients from a cutting board to a finished plate. Relative positions keep the visual clear of the text, while fixed description areas prevent layout shifts.

Menu headings and cards appear as they enter the viewport. Category and dietary filters work together, and dish details open in accessible dialogs. The gallery supports keyboard navigation. Reduced-motion preferences replace the major animated scenes with completed compositions.

## Content requirements

- Every menu item is vegetarian; vegan labels exclude dairy, eggs, honey and other animal-derived ingredients.
- Gluten-free labels describe recipe ingredients without promising an allergen-free kitchen.
- The menu contains twelve sample entries, with USD prices, ingredients and allergen information.
- Venue details, photographs, opening hours and prices are illustrative. No customer reviews or business results are fabricated.
- The reservation form remains an explicit demo until a verified delivery provider is configured. A form submission never claims to confirm a booking.

## Page structure

1. Brand introduction and animated signature plate.
2. Scroll-driven ingredient preparation.
3. Seasonal menu, combined filters and dish details.
4. Restaurant story and food philosophy.
5. Atmosphere gallery and image viewer.
6. Reservation preview form.
7. Illustrative Portland location, service hours and footer navigation.

## Technical approach

The site uses Next.js App Router, React, TypeScript, Tailwind CSS, React Hook Form and Zod. Motion uses native CSS, IntersectionObserver and requestAnimationFrame. Fonts are self-hosted, and images use Next.js optimization.

The production images were generated specifically for this fictional concept. The supplied restaurant screenshots informed the art direction and are not included as website assets. Generation prompts and license information are documented in [docs/ASSETS.md](docs/ASSETS.md).

## Delivery status

The website is published on Vercel, with source stored in the private [GitHub repository](https://github.com/kreatorrdev/root-and-ritual). The repository is connected to the existing Vercel project for deployment from `main`. The local build, automated checks and browser review have passed, and the live menu, images, metadata and demo reservation response have been verified. Real reservation delivery is intentionally unconfigured.
