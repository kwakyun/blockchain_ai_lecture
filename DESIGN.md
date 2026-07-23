---
name: Premium Amber & Slate
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#514533'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#847560'
  outline-variant: '#d6c4ac'
  surface-tint: '#7f5600'
  primary: '#7f5600'
  on-primary: '#ffffff'
  primary-container: '#ffb100'
  on-primary-container: '#6a4700'
  inverse-primary: '#ffba3f'
  secondary: '#934b19'
  on-secondary: '#ffffff'
  secondary-container: '#ffa26a'
  on-secondary-container: '#783603'
  tertiary: '#516169'
  on-tertiary: '#ffffff'
  tertiary-container: '#b3c3cd'
  on-tertiary-container: '#415159'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdeae'
  primary-fixed-dim: '#ffba3f'
  on-primary-fixed: '#281800'
  on-primary-fixed-variant: '#604100'
  secondary-fixed: '#ffdbc9'
  secondary-fixed-dim: '#ffb68c'
  on-secondary-fixed: '#321200'
  on-secondary-fixed-variant: '#753401'
  tertiary-fixed: '#d5e5ef'
  tertiary-fixed-dim: '#b9c9d3'
  on-tertiary-fixed: '#0e1d25'
  on-tertiary-fixed-variant: '#3a4951'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The brand personality is **sophisticated, energetic, and refreshing**, capturing the essence of a high-end draft beer experience. It targets a modern urban audience that values craft quality and a vibrant social atmosphere. 

The design style is a blend of **Minimalism and Industrial Modernism**. It utilizes expansive white space (the "foam") to allow the rich amber tones to pop, while grounding the interface with structured, slate-grey elements that evoke a contemporary pub interior. The emotional response should be one of "crisp refreshment"—clean, professional, yet deeply inviting through the use of warm, glowing accent colors.

## Colors
The palette is inspired by the visual anatomy of a perfect pour.
- **Primary (Golden Amber):** `#FFB100` — Used for primary actions, highlights, and status indicators. It represents the glow of the beer.
- **Secondary (Deep Malt):** `#8B4513` — A rich brown used for subtle accents and depth in illustrations or secondary UI elements.
- **Tertiary (Industrial Slate):** `#2F3E46` — A cool, dark grey used for text, iconography, and structural containers to provide a modern "pub" contrast.
- **Neutral (Foam White):** `#F8F9FA` — The background color, providing a crisp, clean canvas that ensures the amber tones feel vibrant and fresh.

## Typography
The typography strategy balances high-energy headlines with highly functional body text. 
- **Headlines:** Use **Plus Jakarta Sans** for its friendly yet modern geometric construction. Extra Bold weights should be used for main headings to create a sense of confidence.
- **Body:** **Work Sans** provides a grounded, professional feel that ensures menu items and descriptions are legible even in low-light environments.
- **Accents/Labels:** **Space Grotesk** is used for technical details (e.g., ABV%, IBU, Price) to add an industrial, precise edge to the design.

## Layout & Spacing
The design system utilizes a **fluid 12-column grid** for desktop and a **4-column grid** for mobile. 
- **Rhythm:** A strict 8px base unit drives all padding and margin decisions. 
- **Breathability:** Generous vertical spacing (64px+) between sections is encouraged to mimic the premium, uncluttered feel of a high-end establishment.
- **Mobile Reflow:** Cards and menu lists should transition from multi-column layouts on desktop to full-width stacked elements on mobile, ensuring tap targets remain accessible.

## Elevation & Depth
To maintain the industrial-minimalist aesthetic, depth is achieved through **Tonal Layering** and **Subtle Glassmorphism** rather than heavy shadows.
- **Surfaces:** Use slightly darker shades of the neutral background (`#F1F3F5`) to define card containers.
- **Overlays:** For navigation bars or modals, use a backdrop blur (12px) with a 90% opaque white fill to simulate the condensation on a cold glass.
- **Shadows:** When necessary, use extremely soft, elongated shadows with a slight amber tint (`rgba(255, 177, 0, 0.05)`) to make primary buttons feel like they are glowing.

## Shapes
The shape language is **"Rounded Industrial."** We avoid harsh 0px corners to remain welcoming, but we avoid full pills to maintain a sophisticated architectural feel. 
- **Standard Radius:** 0.5rem (8px) for cards and buttons.
- **Large Radius:** 1.5rem (24px) for featured promotional banners or "pour of the day" highlights.
- **Iconography:** Icons should be medium-stroke (2px) with slightly rounded ends to match the typography.

## Components
- **Buttons:** Primary buttons feature a solid Golden Amber background with Slate Grey text for maximum contrast. Secondary buttons use a Slate Grey outline.
- **Beer Cards:** Use high-quality photography with a subtle gradient overlay at the bottom to ensure the "Label-Caps" typography (Beer Name/ABV) is legible.
- **Selection Chips:** Used for beer styles (IPA, Lager, Stout). These should be Slate Grey with white text, turning Golden Amber when active.
- **Menu Lists:** Clean, border-bottom separation using `#E9ECEF`. Use Space Grotesk for pricing to create a distinct visual "anchor" on the right side.
- **Status Indicators:** Use a "Freshness Pulse"—a small, animated amber dot next to specific kegs to indicate they were tapped within the last 24 hours.
- **Input Fields:** Minimalist with a bottom-only border that turns Golden Amber on focus, reinforcing the modern, industrial feel.