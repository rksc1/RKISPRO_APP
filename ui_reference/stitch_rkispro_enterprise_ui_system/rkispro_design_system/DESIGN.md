---
name: RKISPro Design System
colors:
  surface: '#001620'
  surface-dim: '#001620'
  surface-bright: '#233c49'
  surface-container-lowest: '#001019'
  surface-container-low: '#021e2a'
  surface-container: '#06222e'
  surface-container-high: '#132d39'
  surface-container-highest: '#1e3844'
  on-surface: '#cce6f7'
  on-surface-variant: '#bbc9ca'
  inverse-surface: '#cce6f7'
  inverse-on-surface: '#1a3340'
  outline: '#859394'
  outline-variant: '#3c494a'
  surface-tint: '#3cdae2'
  primary: '#45e0e8'
  on-primary: '#003739'
  primary-container: '#00c4cc'
  on-primary-container: '#004c4f'
  inverse-primary: '#00696e'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#00e2eb'
  on-tertiary: '#003739'
  tertiary-container: '#00c4cc'
  on-tertiary-container: '#004c4f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#63f7ff'
  primary-fixed-dim: '#3cdae2'
  on-primary-fixed: '#002021'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#61f7ff'
  tertiary-fixed-dim: '#00dce4'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#004f53'
  background: '#001620'
  on-background: '#cce6f7'
  surface-variant: '#1e3844'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  display-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for a high-stakes B2B construction marketplace, balancing the ruggedness of the industry with the precision of premium enterprise software. The brand personality is **modern, trustworthy, and efficient**, drawing inspiration from high-performance tools like Linear and Stripe.

The visual style utilizes a **refined Dark Mode** combined with **Glassmorphism**. Surfaces are treated as physical layers of light-permeable material. Depth is established through subtle backdrop blurs, delicate inner borders, and atmospheric teal/amber mesh gradients that suggest a high-tech, "heads-up display" (HUD) environment. This approach creates a sense of focused clarity and premium quality.

## Colors
The palette is rooted in deep, cool charcoals and navy blacks to reduce eye strain during long-form professional use. 

- **Primary Accent (Teal):** Used for primary actions, success states, and key navigational indicators.
- **Secondary Accent (Amber):** Reserved for warnings, pending statuses, and highlighting premium marketplace listings.
- **Surface Strategy:** Layers are built from `#020D14` (base) up to `#0A1825` (interactive cards). 
- **Glow Effects:** Teal and amber glows should be used sparingly as "light leaks" behind key cards or as subtle outer glows on active primary buttons to simulate a radiant, high-energy interface.

## Typography
The typography system uses **Plus Jakarta Sans** for headers to provide a modern, slightly geometric character that feels approachable yet professional. **Inter** is utilized for all functional UI text and body copy due to its exceptional legibility and systematic feel.

For mobile views, `display-lg` should be capped at `24px` to ensure hierarchy remains tight within smaller viewports. Use `text_white` for headers and primary body text, and `text_muted` for captions, metadata, and secondary labels to create a clear visual scale.

## Layout & Spacing
The layout follows a **fluid grid** system. On desktop, a 12-column grid is used with a 24px gutter. On mobile, this collapses to a 4-column grid with 16px margins.

Spacing follows a strictly linear 4px scale. 
- **Internal Card Padding:** Always use `md` (16px) or `lg` (24px).
- **Section Spacing:** Use `xl` (32px) to separate distinct content groups.
- **Component Gap:** Use `sm` (8px) for related elements like icon+label pairs.

## Elevation & Depth
Elevation is achieved through a combination of color stepping and **glassmorphism**.
- **Level 1 (Base):** `#020D14` background.
- **Level 2 (Cards/Surfaces):** `#0A1825` with a `backdrop-filter: blur(12px)`.
- **Level 3 (Modals/Popovers):** `#0E1E27` with a subtle 1px inner border of `#1E3444` and a soft, diffused black outer shadow (0px 8px 24px rgba(0,0,0,0.5)).

**Glows:** High-priority elements may use a "mesh gradient" background or a `drop-shadow` using the primary teal color at 20% opacity to simulate light emission.

## Shapes
The shape language is controlled and sophisticated. 
- **Standard Cards:** 12px corner radius.
- **Modals:** 16px corner radius to emphasize their importance and "floating" nature.
- **Tags/Badges:** 8px for a compact, technical look.
- **Primary Buttons:** 24px (Pill-shaped) to distinguish them from structural elements and make them feel more tactile.

## Components
- **Buttons:** 
  - *Primary:* Teal-to-TealGlow gradient, 24px radius, white text. Add a 10px teal outer glow on hover.
  - *Secondary:* Ghost style with `#1E3444` border and `text_white`.
- **Inputs:** Dark navy background (`#060E14`), 8px radius, `subtle_border`. Focus state transitions the border to `primary_accent` with a 4px teal outer glow.
- **Cards:** Use `card_surface`, 12px radius, and a 1px inner border using `subtle_border`. Apply `backdrop-filter: blur(10px)`.
- **Navigation:** Bottom bar on mobile uses a high-blur glass effect. Active states are indicated by a soft teal pill-shaped background behind the icon.
- **Badges:** Small, 8px radius, using low-opacity fills of the status color (Teal for "Active", Amber for "Pending", Red for "Alert") with high-saturation text.
- **Lists:** Items separated by `subtle_border` (bottom-only). Hover states should use a slight brightening of the background to `#0E1E27`.