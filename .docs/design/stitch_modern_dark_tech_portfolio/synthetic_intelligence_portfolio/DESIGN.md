---
name: Synthetic Intelligence Portfolio
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e3fdff'
  on-primary: '#00373a'
  primary-container: '#00f3ff'
  on-primary-container: '#006b71'
  inverse-primary: '#00696f'
  secondary: '#d1bcff'
  on-secondary: '#3c0090'
  secondary-container: '#7000ff'
  on-secondary-container: '#ddcdff'
  tertiary: '#fbf7f8'
  on-tertiary: '#313031'
  tertiary-container: '#dedbdc'
  on-tertiary-container: '#616061'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d1bcff'
  on-secondary-fixed: '#23005b'
  on-secondary-fixed-variant: '#5700c9'
  tertiary-fixed: '#e5e2e3'
  tertiary-fixed-dim: '#c8c6c7'
  on-tertiary-fixed: '#1c1b1c'
  on-tertiary-fixed-variant: '#474647'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  grid-margin: 24px
  grid-gutter: 20px
---

## Brand & Style

This design system is engineered for a high-performance developer portfolio that bridges the gap between human creativity and machine precision. The brand personality is technical, visionary, and hyper-modern. It targets a sophisticated audience of tech recruiters, engineering leaders, and open-source collaborators.

The visual direction is a hybrid of **Minimalist-Futurism** and **Glassmorphism**. It utilizes deep obsidian voids contrasted against high-energy neon accents. The UI should feel like a high-end command center—precise, data-dense but legible, and atmospheric. Key visual motifs include micro-glows, perimeter-lit borders, and subtle background grid patterns that evoke a sense of digital structure and infinite scale.

## Colors

The palette is anchored in a true-dark foundation to ensure maximum contrast for neon elements.

- **Background (Surface):** `#0A0A0B` (Deep Obsidian). All primary surfaces reside here.
- **Primary Accent:** `#00F3FF` (Neon Cyan). Used for primary actions, success states, and critical data points.
- **Secondary Accent:** `#7000FF` (Electric Violet). Used for hover states, depth gradients, and secondary visual interest.
- **Neutral/Secondary Text:** `#94A3B8` (Slate Gray). Used for body copy and metadata to maintain a clear visual hierarchy against the vibrant accents.
- **Surface Overlays:** Use semi-transparent variants of the background (e.g., `rgba(10, 10, 11, 0.8)`) to facilitate glassmorphic layering.

## Typography

The typographic system utilizes a triple-font approach to balance personality and utility. 

- **Sora** handles headlines with its geometric, wide-stanced terminals, providing a futuristic "tech-giant" feel.
- **Inter** is the workhorse for body content, ensuring maximum legibility across all browser engines.
- **JetBrains Mono** is reserved for technical metadata, labels, and code blocks, reinforcing the developer-centric nature of the portfolio.

Apply a subtle text-shadow (0 0 8px) using the primary color at low opacity for "Display" level typography to simulate a light-emissive screen effect.

## Layout & Spacing

This design system employs a **Fluid Grid** model based on a 12-column layout for desktop and a 4-column layout for mobile. 

The spacing rhythm follows a 4px baseline, but emphasizes generous vertical margins (`xl`) to allow high-tech visual elements space to breathe. 

- **Desktop:** 12 columns, max-width 1440px, centered.
- **Tablet:** 8 columns, 32px margins.
- **Mobile:** 4 columns, 16px margins.

Use a subtle CSS background pattern of 40px x 40px grid lines in `rgba(255, 255, 255, 0.03)` across the entire viewport to anchor the layout in a "blueprint" aesthetic.

## Elevation & Depth

In this dark-mode environment, depth is achieved through **luminance and translucency** rather than traditional black shadows.

1.  **Level 0 (Base):** Deep Obsidian background with grid pattern.
2.  **Level 1 (Cards/Sections):** Semi-transparent glass (`rgba(255, 255, 255, 0.03)`) with a 1px solid border of `rgba(255, 255, 255, 0.1)` and 12px backdrop blur.
3.  **Level 2 (Modals/Popovers):** Higher opacity glass (`rgba(255, 255, 255, 0.08)`) with a perimeter-lit border using a linear gradient of Cyan to Violet at 15% opacity.

**Glow Effects:** Use `box-shadow: 0 0 20px rgba(0, 243, 255, 0.2)` on active interactive elements to signify "power-on" states.

## Shapes

The shape language is **Technical-Soft**. Elements use a consistent 0.25rem (4px) corner radius to feel precise and engineered. 

Avoid large, organic rounds or pill shapes unless used for specialized "Tag" components. The structure should feel like modular components of a mainframe. 

Decorative elements (like corner accents on cards) should use 45-degree chamfers instead of curves to lean into the futuristic aesthetic.

## Components

### Buttons
- **Primary:** Solid Cyan background, black text. On hover, apply a Cyan glow effect and translate -2px.
- **Secondary:** Transparent background, 1px Cyan border, Cyan text.
- **Ghost:** Monospace text with a "+" icon prefix; Cyan color on hover.

### Cards
- **Project Card:** Glassmorphic surface, 1px border. On hover, the border gradient transitions from Neutral to a Cyan/Violet sweep.
- **Feature Card:** Minimalist, using `label-caps` for headers and a micro-grid icon.

### Inputs & Form Fields
- Dark background (`#000000`), 1px border (`#1A1A1B`).
- On focus, the border glows Cyan and the label shifts to `code-sm` typography above the field.

### Chips/Tags
- Monospace font, `0.25rem` radius. 
- Background: `rgba(0, 243, 255, 0.1)`, Text: Cyan, Border: 1px `rgba(0, 243, 255, 0.2)`.

### Code Blocks
- Background: `#050505`, rounded-sm. 
- Syntax highlighting should strictly follow the Cyan/Violet/Slate palette to ensure brand consistency.

### Navigation
- Top-sticky bar, 70% opacity background with heavy (20px) backdrop blur.
- Active links marked by a 2px Cyan underline that glows.