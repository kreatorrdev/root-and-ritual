# Root & Ritual — a restaurant website with a sense of ritual

## The brief

Build a polished portfolio concept for a fictional, fully vegetarian restaurant in the United States. The experience should make the food feel tangible, help visitors browse the menu and demonstrate an honest reservation-request flow. English copy and USD prices keep the concept consistent.

The supplied visual references moved the direction toward dark stone, oversized typography, colorful overhead food photography and a cinematic sense of movement. The requested centerpiece was an empty plate that fills with food, with additional ingredient preparation driven by scrolling and a menu revealed as it enters view.

## The design

A dark charcoal foundation gives the photographic ingredients the foreground. Warm cream text provides the main hierarchy; botanical lime connects the primary actions, vegetarian marker and italic editorial accents. Manrope supplies the clear contemporary type, with Cormorant Garamond italics adding warmth.

The page progresses from a signature plate to its preparation, then to menu exploration, the restaurant philosophy, atmosphere, a table request and practical visit information. Each section has a distinct purpose. No fabricated reviews, customer counts or promotional claims are needed.

## Making the food move

The hero uses a transparent ceramic plate and nine independent photographic ingredient layers, taken from a shared sprite sheet. Each piece has its own position, rotation, origin and delay. The result starts with a visible empty plate and resolves into a complete vegetarian bowl. It can be replayed without reloading the page.

The preparation section uses native scroll position to move from a board of ingredients through preparation and a warm roasting stage to a plated meal. Frame-rate-independent damping softens wheel and keyboard jumps; overlapping eased ranges stagger the board, plate and individual ingredients. Relative positions and a bounded visual keep food clear of the copy across desktop and phone layouts. Step descriptions reserve their space while fading between states. The effect does not hijack scrolling or require a large animation dependency.

Menu headings and cards use IntersectionObserver to reveal as they approach the viewport. A reduced-motion preference removes the introductory movement and displays a static completed preparation scene.

## Usable beyond the first impression

Category and dietary filters intersect rather than replace each other. An intentionally empty combination, such as vegan desserts, produces a useful empty state. Every item has typed ingredients and allergen information, and the labels reflect the sample recipes.

Native dialogs provide keyboard containment and Escape handling; closing a dialog restores focus to its trigger. The gallery supports previous/next controls and arrow keys. Mobile navigation uses an accessible disclosure button, with controls and text adjusted for small screens.

## An honest reservation demo

The form validates on the client and the server. Dates and time slots follow Portland's local timezone, including daylight-saving behavior, opening hours and the Monday closure. Guest counts stay within sensible bounds. A honeypot and a small payload limit provide basic protection.

With delivery unconfigured, the result explicitly says that the request was not submitted and no table was booked. A future verified provider can be connected without pretending that a form submission is a confirmed reservation.

## Validation and release status

The project includes linting, TypeScript checks, automated recipe/filter and reservation-validation tests, an optimized production build, local endpoint error-case checks and manual browser review. At the owner's request, it was published directly to Vercel on October 19, 2026: https://root-and-ritual-sooty.vercel.app. Live review confirmed menu filtering, successful image loading, production-domain social metadata and the explicitly non-submitting demo reservation response. GitHub publication remains a later step.

All restaurant details, photography and prices are illustrative. This case study describes a development exercise, not a live restaurant or a measured commercial result.
