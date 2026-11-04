/**
 * AgriTrust design tokens — derived from `style-guide.md`.
 * Use these instead of hard-coded values in components.
 */
import '@/global.css';

import { Platform, type TextStyle } from 'react-native';

export const Colors = {
  // Primary
  primary: '#49CBEB',
  primaryLight: '#98E2F4',
  navActive: '#CDEFF6',

  // Secondary / pastel
  mint: '#83F5CC',
  pink: '#FDB0E3',
  mintLight: '#DDFFF1',
  pinkLight: '#FFE7F6',
  showcase: '#CDE5EA',

  // Backgrounds & surfaces
  background: '#FAFAFA',
  backgroundSecondary: '#F3F5F7',
  surface: '#FFFFFF',
  surfaceDark: '#1C1C1C',
  surfaceDarkSecondary: '#323232',

  // Text
  textPrimary: '#1C1C1C',
  textSecondary: '#888888',
  textMuted: '#A5A5A5',
  textInverse: '#FFFFFF',
  /** Secondary text on dark surfaces (not in the guide; keeps AA contrast on #1C1C1C). */
  textInverseSecondary: '#C9C9C9',

  // Borders
  border: '#EAEAEA',
} as const;

export type ColorToken = keyof typeof Colors;

export const Space = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export const Radius = {
  xs: 8,
  sm: 12, // badges
  md: 16, // navigation selection
  lg: 20, // small cards
  xl: 24, // standard cards
  '2xl': 28,
  '3xl': 32,
  full: 999,
} as const;

export const Layout = {
  screenPadding: 20,
  buttonHeight: 52,
  inputHeight: 56,
  navigationHeight: 72,
  minTouch: 44,
  maxContentWidth: 640,
} as const;

/**
 * Zona Pro is the brand typeface. It is not bundled yet (licensed font) — once the
 * font files are added, load them with the expo-font config plugin and set the
 * family name here. Until then, web falls back via CSS and native uses the system font.
 */
const fontFamily = Platform.select({ web: 'var(--font-primary)', default: undefined });

const type = (fontSize: number, lineHeight: number, fontWeight: TextStyle['fontWeight']): TextStyle => ({
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
});

export const Typography = {
  display: type(34, 40, '700'),
  h1: type(30, 38, '700'),
  h2: type(26, 34, '700'),
  h3: type(22, 30, '600'),
  h4: type(20, 28, '600'),
  cardHeading: type(18, 24, '600'),
  bodyLarge: type(16, 24, '400'),
  body: type(14, 22, '400'),
  button: type(14, 20, '500'),
  label: type(13, 18, '500'),
  caption: type(12, 16, '400'),
  smallCaption: type(11, 16, '400'),
} as const;

export type TypographyVariant = keyof typeof Typography;

/**
 * No shadows anywhere in the app (product decision). Separate surfaces with
 * background contrast, or a 1px `Colors.border` line on white surfaces.
 */

export const Duration = {
  press: 120,
  fast: 150,
  normal: 250,
  slow: 350,
} as const;
