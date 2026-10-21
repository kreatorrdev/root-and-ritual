# Images, generation prompts and font licenses

All six photographic assets below were generated with the **built-in `image_gen` tool**, not the CLI/API fallback. The original generated files were copied into this project's `public/images/` directory. The transparent PNG files retain their original alpha channels. Next.js serves optimized derivatives at runtime; source imagery is not loaded from third-party hosts by visitors.

The user's four website screenshots were visual references for dark backgrounds, prominent food imagery and hierarchy. They are not shipped as site assets. Food in this implementation remains vegetarian regardless of the contents of those references.

## Final project assets

| File                                    | Role                                                                              |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| `public/images/empty-plate.png`         | Transparent empty ceramic plate, used as the base of both animations              |
| `public/images/ingredients-atlas.png`   | Nine separate transparent food groups, displayed as independently animated layers |
| `public/images/menu-grid.png`           | Six illustrative dish photos, displayed through individual cropped cells          |
| `public/images/cafe-grid.png`           | Four illustrative café drink photos                                               |
| `public/images/preparation.png`         | Editorial vegetarian preparation still life                                       |
| `public/images/restaurant-interior.png` | Illustrative fictional restaurant interior                                        |

## Final prompt set

### Empty plate — transparent background

> Use case: product-mockup. A single EMPTY round dark charcoal matte ceramic dinner plate, perfectly top-down orthographic food photography, entire plate visible centered on genuinely transparent background. Plate occupies 91% of a square canvas, subtle concentric ceramic texture, wide raised rim with a thin naturally worn edge, soft natural daylight from upper left, understated realistic shadow directly underneath the plate only. Absolutely no food, no utensils, no table, no text, no watermark. This is the empty base layer for a premium vegetarian restaurant website animation. Photorealistic not illustration. True alpha transparency around the plate.

### Ingredient atlas — transparent background

> Use case: product-mockup. Create one precisely aligned THREE BY THREE ingredient sprite atlas on a genuinely transparent square background, orthographic directly overhead photorealistic food photography. Nine equal square invisible grid cells, each subject entirely contained in its cell with generous transparent padding, no overlaps between cells, NO visible lines, NO labels, NO text, NO plates or bowls. Same scale and soft daylight from upper left across all nine cells. Top row left: a broad loose bed of fresh arugula and baby spinach leaves, enough to form the base of a salad. Top row middle: a small cluster of warm golden roasted sweet potato cubes with charred corners. Top row right: half an avocado sliced and fanned, pale green with darker edges. Middle row left: five cherry tomato halves red and golden, cut side up. Middle row center: a creamy ivory hummus swoosh topped with a tiny drop of olive oil, no dish. Middle row right: a small pile of golden roasted chickpeas. Bottom row left: six overlapping thin cucumber rounds. Bottom row middle: several delicate watermelon radish slices pink and white. Bottom row right: three large fresh basil leaves and a tiny basil sprig. Individual ingredients are premium realistic food cutout photography, vibrant yet natural, clean true alpha transparency including between objects. This sprite sheet will be displayed one cell at a time and the nine layers animated into a single vegetarian salad on an empty plate.

### Preparation still life

> Use case: photorealistic-natural. Wide panoramic editorial still-life photograph for a contemporary vegetarian restaurant website, dark almost-black textured slate kitchen counter, dramatic but soft natural light from the upper right. In the right half a rustic dark cutting board with fresh cucumber rounds, sliced red tomatoes, basil, radishes and a small bowl of roasted chickpeas. A simple chef knife lies diagonally along the far right. A few scattered leaves and tiny seeds across the surface. Left half is mostly empty richly textured charcoal stone with subtle flour dust near the bottom edge, usable negative space for website typography. Very high-end restaurant photography, tactile surfaces, overhead composition, no people, no hands, absolutely no meat or fish, no text, no logos, no watermark. Landscape 3:2 composition.

### Menu photography

> Use case: photorealistic-natural. Food photography sprite sheet: a precise 3 COLUMN by 2 ROW contact sheet on a wide 3:2 canvas with SIX equal SQUARE photographic panels aligned edge-to-edge, NO gaps, NO grid lines, NO text, NO labels. Each panel is a separate exquisitely styled overhead food photo on dark charcoal slate, dark ceramic plates, dramatic natural side light, real restaurant photography. Top left panel: colorful vegetarian salad bowl with chickpeas avocado sweet potato greens radish cucumber cherry tomatoes and hummus. Top middle panel: wide ribbon pasta with roasted mushrooms, thyme, olive oil and shaved vegetarian microbial-rennet hard cheese. Top right panel: beautifully charred roasted cauliflower florets over lemon tahini, parsley and pomegranate. Bottom left panel: thick sourdough toast topped with oyster mushrooms, thyme and olive oil, no egg. Bottom middle panel: ruby roasted beets with white burrata torn open, orange segments, walnuts and basil. Bottom right panel: a beautiful small lemon tart slice with golden pastry, lemon zest and mint, on a dark plate. All six are entirely vegetarian. Full dish contained in its square panel with a little slate edge. No meat, fish, seafood, people, hands, logos or watermarks. True premium editorial quality with appetizing texture and vibrant natural colors. Layout must be exactly THREE columns TWO rows, square photos, overall wide horizontal image.

### Café photography

> Use case: photorealistic-natural. Precisely aligned TWO by TWO square photographic contact sheet, four equal square photos edge-to-edge, no gaps no lines no text. Consistent dark charcoal slate tabletop, premium café editorial natural side light. Top left: overhead ceramic charcoal cup of oat flat white with exquisite leaf latte art, saucer, a few coffee beans. Top right: iced black cold brew in clear tumbler with ice, coffee beans beside it. Bottom left: burgundy hibiscus tea in small clear glass tea cup with dried pink hibiscus petals. Bottom right: tall pale yellow rosemary lemon sparkling lemonade with lemon slice, rosemary sprig and ice. Four delicious completely vegan drinks, real photography, dark elegant atmosphere, absolutely no writing, logos, watermarks, people.

### Restaurant interior

> Use case: photorealistic-natural. Premium contemporary vegetarian neighborhood restaurant and café interior in Portland Oregon, no people. Warm walnut tables, dark charcoal plaster walls, sage-green upholstered banquette seating, large old factory windows showing a softly blurred leafy street, warm natural late afternoon side light, lush indoor plants, small delicate flowers on wooden table, dark ceramic plates and linen napkins. Quiet inviting lived-in modern editorial architecture photography, slightly moody with rich tactile materials, cozy but uncluttered. Landscape composition, photograph of fictional venue, no logos, no letters, no watermarks.

## Fonts and icons

The current Kitchen Remedy-inspired typography uses these self-hosted variable Latin fonts, distributed by Fontsource v5.3.0 under the SIL Open Font License:

- Wix Madefor Display: `public/fonts/wix-madefor-display-latin.woff2`; license in `public/fonts/OFL-Wix-Madefor-Display.txt`. [Fontsource details](https://fontsource.org/fonts/wix-madefor-display/about).
- Hanken Grotesk: `public/fonts/hanken-grotesk-latin.woff2`; license in `public/fonts/OFL-Hanken-Grotesk.txt`. [Fontsource details](https://fontsource.org/fonts/hanken-grotesk/about).
- The botanical sprig is an original code-native SVG in `src/components/botanical-art.tsx`; no artwork was copied from the reference website.

The original Manrope and Cormorant files below are retained with their licenses for the earlier design screenshots. They are no longer loaded by the live page.

- Manrope variable Latin WOFF2: `public/fonts/manrope-latin.woff2`; license notice in `public/fonts/OFL-Manrope.txt`.
- Cormorant Garamond variable italic Latin WOFF2: `public/fonts/cormorant-italic-latin.woff2`; license notice in `public/fonts/OFL-Cormorant-Garamond.txt`.
- Font files were downloaded from Fontsource's jsDelivr distribution and are self-hosted through `next/font/local`. The SIL Open Font License notices are included in full.
- Interface icons use `lucide-react`, under its included ISC license.
- The charcoal grain, cutting board, knife silhouette and roasting glow are code-native decorative effects. Food and venue images are generated raster assets.

## Earlier design exploration

The initial three-direction preview used Anna Pelzer's [Vegan salad bowl on Unsplash](https://unsplash.com/photos/bowl-of-vegetable-salads-IGfIGP5ONV0), under the [Unsplash license](https://unsplash.com/license). That photograph is not used in the implemented website.
