
# Mobile App Design Style Guide

## 1. Design Overview

The application follows a modern, minimalist, and playful design system characterized by pastel colors, bold geometric typography, rounded components, clean layouts, and expressive illustrations.

### Design Principles

- **Minimalism:** Keep interfaces clean, simple, and uncluttered.
- **Soft Aesthetics:** Use pastel colors, rounded surfaces, and subtle visual effects.
- **Strong Typography:** Establish hierarchy through font size and weight.
- **Consistency:** Maintain uniform spacing, colors, radii, and component styles.
- **Accessibility:** Ensure adequate contrast, readable typography, and comfortable touch targets.
- **Playfulness:** Introduce expressive illustrations and colorful interactive states.
- **Balance:** Combine light backgrounds with dark surfaces for visual contrast.

---

## 2. Typography

### Primary Typeface

**Zona Pro**

A modern geometric sans-serif typeface featuring clean letterforms and a contemporary appearance.

Use Zona Pro throughout the application for headings, paragraphs, buttons, labels, and navigation.

### Font Fallback

```css
font-family: "Zona Pro", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
```

### Typography Scale

| Element | Weight | Size | Line Height |
|---------|--------|------|-------------|
| Display Heading | Bold (700) | 34px | 40px |
| H1 | Bold (700) | 30px | 38px |
| H2 | Bold (700) | 26px | 34px |
| H3 | Semibold (600) | 22px | 30px |
| H4 | Semibold (600) | 20px | 28px |
| Card Heading | Semibold (600) | 18px | 24px |
| Body Large | Regular (400) | 16px | 24px |
| Body Default | Regular (400) | 14px | 22px |
| Button Text | Medium (500) | 14px | 20px |
| Label | Medium (500) | 13px | 18px |
| Caption | Regular (400) | 12px | 16px |
| Small Caption | Regular (400) | 11px | 16px |

### Typography Rules

- Use bold headings to establish visual hierarchy.
- Keep body text at regular weight.
- Use medium weight for buttons, tabs, and interactive labels.
- Prefer left-aligned text for content-heavy screens.
- Use centered text for onboarding questions and illustrations.
- Avoid excessive letter spacing.
- Maintain consistent line heights.
- Avoid using more than three font weights on a single screen.
- Use near-black text instead of pure black when appropriate.

---

## 3. Color System

The application uses a predominantly neutral foundation with pastel cyan, mint green, and pink accents.

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Cyan | `#49CBEB` | Primary accent, buttons, charts, interactive elements |
| Mint Green | `#83F5CC` | Calm states, positive selections, emotional indicators |
| Light Gray | `#F3F5F7` | Secondary backgrounds and surfaces |
| White | `#FFFFFF` | Main surfaces, cards, and buttons |

### Secondary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Charcoal | `#1C1C1C` | Dark backgrounds, headings, dark cards |
| Soft Blue | `#98E2F4` | Secondary cards, play buttons, highlights |
| Pastel Pink | `#FDB0E3` | Happy states, selected emotions |
| Light Mint | `#DDFFF1` | Mint illustration backgrounds |
| Light Pink | `#FFE7F6` | Pink illustration backgrounds |
| Dark Gray | `#323232` | Unselected chips and dark secondary surfaces |
| Showcase Blue | `#CDE5EA` | Decorative backgrounds |
| Near White | `#FAFAFA` | Main application background |

### Neutral Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Text Primary | `#1C1C1C` | Headings and primary content |
| Text Secondary | `#888888` | Descriptions and secondary labels |
| Text Muted | `#A5A5A5` | Placeholder text, metadata |
| Text Inverse | `#FFFFFF` | Text on dark backgrounds |
| Border Subtle | `#EAEAEA` | Subtle dividers and borders |

### Color Tokens

```css
:root {
  /* Primary */
  --color-primary: #49CBEB;
  --color-primary-light: #98E2F4;

  /* Secondary */
  --color-mint: #83F5CC;
  --color-pink: #FDB0E3;

  /* Pastel Backgrounds */
  --color-mint-light: #DDFFF1;
  --color-pink-light: #FFE7F6;
  --color-showcase: #CDE5EA;

  /* Backgrounds */
  --color-background: #FAFAFA;
  --color-background-secondary: #F3F5F7;
  --color-surface: #FFFFFF;
  --color-surface-dark: #1C1C1C;
  --color-surface-dark-secondary: #323232;

  /* Text */
  --color-text-primary: #1C1C1C;
  --color-text-secondary: #888888;
  --color-text-muted: #A5A5A5;
  --color-text-inverse: #FFFFFF;

  /* Borders */
  --color-border: #EAEAEA;
}
```

### Color Usage Rules

- Use white and near-white for most application surfaces.
- Reserve cyan for primary interactive elements and highlights.
- Use mint green for calm, positive, or selected emotional states.
- Use pink for happy or expressive emotional states.
- Use dark charcoal for onboarding backgrounds and high-contrast cards.
- Avoid unnecessary gradients.
- Prefer solid pastel backgrounds.
- Use dark text on pastel-colored surfaces.
- Use white text on dark surfaces.
- Do not rely on color alone to communicate important states.

---

## 4. Border Radius

Rounded corners are a defining characteristic of the interface.

### Radius Scale

| Component | Radius |
|-----------|--------|
| Small Elements | 8px |
| Badges | 12px |
| Navigation Selection | 16px |
| Small Cards | 20px |
| Standard Cards | 24px |
| Large Cards | 28px |
| Bottom Sheets | 32px |
| Search Inputs | 999px |
| Primary Buttons | 999px |
| Filter Chips | 999px |
| Avatars | 50% |
| Circular Icon Buttons | 50% |

### Radius Tokens

```css
:root {
  --radius-xs: 8px;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-2xl: 28px;
  --radius-3xl: 32px;
  --radius-full: 999px;
}
```

### Radius Rules

- Use 24px as the default card radius.
- Use pill-shaped corners for primary buttons.
- Use fully rounded chips for filters and selections.
- Keep icon buttons circular.
- Maintain consistent corner radii across similar components.
- Avoid sharp rectangular components unless necessary.

---

## 5. Spacing System

Use an 8-point spacing system, with 4px increments for smaller adjustments.

### Spacing Scale

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 12px |
| base | 16px |
| lg | 20px |
| xl | 24px |
| 2xl | 32px |
| 3xl | 40px |
| 4xl | 48px |
| 5xl | 64px |

### Layout Spacing

| Element | Value |
|---------|-------|
| Screen Horizontal Padding | 20–24px |
| Section Spacing | 24–32px |
| Standard Card Padding | 16–20px |
| Space Between Cards | 12–16px |
| Input Spacing | 12–16px |
| Icon-to-Text Gap | 8–12px |
| Button Internal Padding | 16–24px |
| Bottom Navigation Height | 72–88px |

### Spacing Rules

- Maintain generous whitespace around major content sections.
- Use consistent spacing between cards.
- Avoid placing text directly against card edges.
- Group related elements using smaller spacing.
- Separate unrelated sections using larger spacing.
- Respect device safe areas and system navigation insets.

---

## 6. Buttons

Buttons should be simple, rounded, and visually prominent.

### Primary Button

**Appearance**
- Background: `#FFFFFF` on dark screens
- Text: `#1C1C1C`
- Height: 52px
- Border Radius: 999px
- Font Size: 14px
- Font Weight: 500
- Horizontal Padding: 24px

**Behavior**
- Support leading or trailing icons.
- Provide a subtle pressed state.
- Use a disabled state with reduced opacity.

### Accent Button

**Appearance**
- Background: `#49CBEB`
- Text: `#1C1C1C`
- Height: 48–52px
- Border Radius: 999px
- Font Weight: 500

### Circular Action Button

**Appearance**
- Size: 40–48px
- Background: `#98E2F4`
- Icon Color: `#1C1C1C`
- Border Radius: 50%

**Usage**
- Play controls
- Small action buttons
- Contextual actions

### Selection Chips

**Unselected**
- Background: `#323232`
- Text: `#FFFFFF`
- Border Radius: 999px

**Selected — Happy**
- Background: `#FDB0E3`
- Text: `#1C1C1C`

**Selected — Calm**
- Background: `#83F5CC`
- Text: `#1C1C1C`

**Selected — Other Categories**
- Background: `#98E2F4`
- Text: `#1C1C1C`

### Button Guidelines

- Prefer pill-shaped buttons over rectangular buttons.
- Maintain a minimum touch target of 44×44px.
- Use clear labels.
- Avoid excessive shadows.
- Make selected states visually distinct.
- Provide visible pressed, focused, and disabled states.

---

## 7. Cards and Surfaces

Cards should feel soft, spacious, and lightweight.

### Standard Card

- Background: `#FFFFFF`
- Border Radius: 24px
- Padding: 16–20px
- Border: None by default
- Shadow: Very subtle or none

### Featured Dark Card

- Background: `#1C1C1C`
- Text: `#FFFFFF`
- Border Radius: 24px
- Padding: 20px
- Accent Actions: `#98E2F4`

### Featured Pastel Card

- Background: `#98E2F4`
- Text: `#1C1C1C`
- Border Radius: 24px
- Padding: 16–20px

### Card Content Structure

Cards may contain:

- A bold title
- A short description
- Duration or category badges
- A circular action button
- Supporting metadata

### Card Design Rules

- Prefer solid backgrounds over complex gradients.
- Use large rounded corners.
- Avoid heavy borders.
- Use shadows sparingly.
- Keep content aligned consistently.
- Use contrasting card colors to create hierarchy.
- Avoid overcrowding cards with unnecessary information.

---

## 8. Input Fields and Search

### Search Input

**Appearance**
- Background: `#FFFFFF`
- Height: 52–56px
- Border Radius: 999px
- Horizontal Padding: 20px
- Border: None by default
- Placeholder Color: `#A5A5A5`

**Content**
- Search icon on the left
- Placeholder text
- Optional trailing action

### General Input Guidelines

- Use rounded input fields.
- Maintain comfortable internal padding.
- Avoid strong borders.
- Provide a clear focus state.
- Use subtle background changes when focused.
- Ensure labels and placeholders remain readable.

---

## 9. Navigation

### Bottom Navigation

The application uses a fixed bottom navigation bar with a minimal icon-based layout.

**Appearance**
- Background: `#FFFFFF`
- Height: Approximately 72–88px
- Icons: 20–24px
- Icon Style: Outlined
- Icon Color: `#1C1C1C`

### Active Navigation Item

- Background: Light pastel cyan (`#CDEFF6`)
- Border Radius: 16px
- Icon Color: `#1C1C1C`
- Optional Text Label: 11–12px

### Inactive Navigation Item

- Transparent background
- Outlined icon
- No visible container
- Label hidden when using the reference design pattern

### Navigation Guidelines

- Use simple outlined icons.
- Avoid overly decorative navigation elements.
- Highlight only the active destination.
- Maintain consistent spacing.
- Respect bottom safe-area insets.
- Keep transitions between selected tabs subtle.

---

## 10. Icons

### Icon Style

- Minimal
- Outlined
- Rounded stroke caps
- Consistent stroke width
- Simple recognizable shapes

### Icon Specifications

| Property | Value |
|----------|-------|
| Default Size | 24px |
| Small Size | 16–20px |
| Large Size | 28px |
| Stroke Width | 1.5–2px |
| Default Color | `#1C1C1C` |

### Recommended Icon Library

Lucide Icons or an equivalent consistent outlined icon system.

### Icon Guidelines

- Use the same icon family throughout the application.
- Avoid mixing filled and outlined styles unnecessarily.
- Use filled icons selectively for active states.
- Keep icons visually balanced.
- Maintain consistent sizing across navigation elements.

---

## 11. Illustrations and Graphics

The application uses playful, abstract illustrations to communicate mood and personality.

### Illustration Style

- Flat 2D illustrations
- Simple geometric shapes
- Circular character faces
- Hand-drawn black facial features
- Pastel-colored fills
- No realistic textures
- No complex gradients
- Minimal outlines
- Large negative space

### Emotional Character Design

Emotional characters should use:

- A large colored circle
- Minimal eyes
- A simple line-drawn mouth
- Abstract hair or eyebrow strokes
- Expressive but uncomplicated facial features

### Emotion Colors

| Emotion | Color |
|---------|-------|
| Happy | `#FDB0E3` |
| Calm | `#83F5CC` |
| Anxiety / Concern | `#98E2F4` |

Additional emotional states may use distinct muted pastel colors while maintaining consistency with the existing palette.

### Illustration Guidelines

- Center major illustrations within their containers.
- Use large shapes and minimal detail.
- Avoid photorealism.
- Keep line art dark and clearly visible.
- Use light pastel backgrounds behind illustrations.
- Maintain a friendly and approachable appearance.

---

## 12. Data Visualization

Charts should be minimal, smooth, and consistent with the overall visual language.

### Line Charts

- Line Color: `#49CBEB`
- Line Width: Approximately 3px
- Curves: Smooth and rounded
- Area Fill: Soft cyan with low opacity
- Gridlines: Light gray dotted lines
- Axis Text: Muted gray
- Chart Background: White or near-white

### Mood Indicators

Use small colored markers to represent emotional states.

Examples:

- Happy: Pink
- Calm: Mint
- Neutral or other states: Cyan

### Chart Guidelines

- Avoid strong chart borders.
- Use soft translucent fills.
- Keep gridlines subtle.
- Minimize unnecessary axis labels.
- Use clear visual markers for important data points.
- Maintain enough contrast for readability.

---

## 13. Light and Dark Surfaces

The design combines light application screens with dark onboarding and selection screens.

### Light Surface Style

**Background**
- `#FAFAFA` or `#FFFFFF`

**Text**
- `#1C1C1C`

**Cards**
- White, soft blue, or dark charcoal

**Accents**
- Cyan, mint, and pink

### Dark Surface Style

**Background**
- `#1C1C1C`

**Text**
- `#FFFFFF`

**Secondary Surface**
- `#323232`

**Selected Elements**
- Cyan, mint, or pink

**Primary CTA**
- White background with dark text

### Dark Surface Guidelines

- Avoid adding unnecessary borders.
- Maintain strong text contrast.
- Use pastel selections to provide color and hierarchy.
- Keep the overall interface simple and uncluttered.

---

## 14. Screen Layout Patterns

### Onboarding / Mood Selection Screen

**Structure**

1. Progress indicator at the top.
2. Large pastel illustration panel.
3. Horizontally arranged mood selection chips.
4. Main question centered in the content area.
5. Bottom actions including Skip and Next.

**Design**
- Dark charcoal content background.
- Large expressive illustration.
- White heading text.
- Pill-shaped selection controls.
- Prominent white Next button.

### Home Screen

**Structure**

1. Personalized greeting.
2. Notification action.
3. Rounded search field.
4. Two-column featured cards.
5. Recommended content section.
6. Vertically stacked recommendation cards.
7. Fixed bottom navigation.

**Design**
- Light background.
- Bold headings.
- Rounded white, black, and pastel cards.
- Consistent horizontal spacing.
- Minimal iconography.

### Profile Screen

**Structure**

1. Centered profile avatar.
2. User name.
3. Activity or emotional progress chart.
4. Motivational quote card.
5. Settings list.
6. Fixed bottom navigation.

**Design**
- Light background.
- Large circular avatar.
- Smooth cyan chart.
- Dark quote card.
- Rounded white settings container.
- Subtle dividers between settings items.

---

## 15. Shadows and Elevation

Use minimal shadows to preserve the clean visual style.

### Shadow Levels

**Level 0 — Flat**
- No shadow.
- Used for most cards and surfaces.

**Level 1 — Subtle**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
```

**Level 2 — Floating**
```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
```

### Shadow Guidelines

- Avoid heavy shadows.
- Prefer background contrast over elevation.
- Use stronger shadows only for floating or overlapping elements.
- Maintain consistent shadow behavior across components.

---

## 16. Animations and Interactions

Animations should feel smooth, gentle, and natural.

### Animation Principles

- Use subtle motion.
- Prefer smooth easing or light spring transitions.
- Avoid excessive bouncing.
- Keep animations short and purposeful.
- Respect reduced-motion accessibility preferences.

### Suggested Animation Durations

| Interaction | Duration |
|-------------|----------|
| Button Press | 100–150ms |
| Chip Selection | 150–200ms |
| Card Transition | 200–300ms |
| Screen Transition | 250–350ms |
| Illustration Animation | 400–600ms |

### Interaction Patterns

**Buttons**
- Slight scale reduction or opacity change on press.

**Selection Chips**
- Smooth background color transition.

**Cards**
- Subtle press feedback.

**Navigation**
- Smooth active-state transition.

**Illustrations**
- Gentle expression changes or movements.

---

## 17. Accessibility

### Typography

- Keep body text readable.
- Support dynamic text scaling where possible.
- Avoid very small text for essential information.

### Contrast

- Maintain sufficient contrast between text and backgrounds.
- Prefer dark text on pastel surfaces.
- Avoid using muted gray for critical instructions.
- Aim for WCAG AA contrast requirements.

### Touch Targets

- Minimum recommended interactive area: 44×44px.
- Ensure sufficient spacing between adjacent actions.

### Motion

- Respect reduced-motion settings.
- Avoid unnecessary continuous animation.

### Interaction States

Every interactive component should support:

- Default
- Pressed
- Focused
- Selected, where applicable
- Disabled
- Loading, where applicable

---

## 18. Reusable Design Tokens

The following values represent the recommended defaults.

```css
:root {
  /* Typography */
  --font-family-primary: "Zona Pro", "Inter", sans-serif;

  /* Colors */
  --primary: #49CBEB;
  --primary-light: #98E2F4;
  --mint: #83F5CC;
  --pink: #FDB0E3;

  --background: #FAFAFA;
  --background-secondary: #F3F5F7;
  --surface: #FFFFFF;

  --dark: #1C1C1C;
  --dark-secondary: #323232;

  --text-primary: #1C1C1C;
  --text-secondary: #888888;
  --text-inverse: #FFFFFF;

  --border: #EAEAEA;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radius */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-2xl: 28px;
  --radius-3xl: 32px;
  --radius-full: 999px;

  /* Component Heights */
  --button-height: 52px;
  --input-height: 56px;
  --navigation-height: 80px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.08);

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
}
```

---

## 19. Implementation Guidelines

When building new screens or components, follow these requirements.

### General UI

- Use Zona Pro as the primary font.
- Use near-white backgrounds for standard screens.
- Use dark charcoal backgrounds for immersive mood-selection screens.
- Maintain a 20–24px screen margin.
- Use 24px corner radii for most cards.
- Use pill-shaped primary buttons.
- Prefer solid colors over gradients.
- Keep interfaces visually uncluttered.

### Components

- Build reusable card, button, chip, and input components.
- Use shared design tokens instead of hardcoded values.
- Keep component spacing consistent.
- Support all relevant interactive states.
- Maintain consistent icon styling.

### Colors

- Cyan is the primary interaction accent.
- Mint represents calm or positive emotional states.
- Pink represents happy or expressive emotional states.
- Dark charcoal provides contrast.
- White and light gray form the neutral foundation.

### Typography

- Use bold headings.
- Use regular body text.
- Use medium-weight labels.
- Maintain clear visual hierarchy.
- Avoid excessive font variations.

### Overall Visual Direction

The application should feel:

- Modern
- Minimal
- Calm
- Friendly
- Playful
- Soft
- Spacious
- Approachable

The defining visual characteristics are **Zona Pro typography, pastel cyan and mint colors, large rounded cards, pill-shaped interactive controls, dark charcoal contrast, and simple expressive illustrations.**

---

## 20. Reference Notes

This style guide is based on visual references of a mobile wellness application.

The following characteristics are directly identifiable from the references:

- Zona Pro font family
- Primary cyan `#49CBEB`
- White and light gray surfaces
- Rounded cards and buttons
- Pastel emotion illustrations
- Dark onboarding screens
- Minimal outlined iconography
- Smooth cyan activity charts

Exact spacing, font sizes, radii, animation durations, and several secondary color values are approximations derived from the visual references. They are provided as standardized implementation recommendations rather than verified original design specifications.
