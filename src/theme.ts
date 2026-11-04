/**
 * Shared design tokens.
 *
 * Keeping colours, spacing, and corner radii in one place is what lets the
 * grid stay visually consistent: every tile and every detail screen pulls the
 * same values, so there is no drift between screens.
 *
 * @format
 */

export const colors = {
  /** Page background behind the grid (iOS "grouped background" grey). */
  background: '#F2F2F7',
  /** Card surface colour. */
  surface: '#FFFFFF',
  /** Navigation header background. */
  header: '#FFFFFF',
  /** Primary body text. */
  text: '#1C1C1E',
  /** Secondary text used for the subtitle and detail-screen caption. */
  textMuted: '#6E6E73',
  /** Hairline card border, kept very light so the tiles stay clean. */
  border: '#E5E5EA',
  /** Accent used for the header back arrow and title. */
  accent: '#007AFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
};
