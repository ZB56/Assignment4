/**
 * AppTile — one card in the grid.
 *
 * A card is an image with its caption directly underneath. The card does not
 * decide how wide it is: the home screen measures the window and passes a
 * `size` down, which is what keeps the grid responsive on different screens.
 *
 * @format
 */

import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import type { AppItem } from '../types';

type Props = {
  /** The tile to render. */
  item: AppItem;
  /** Edge length of the square card, measured by the home screen. */
  size: number;
  /** Called with the tile's id when the card is tapped. */
  onPress: (id: string) => void;
};

function AppTile({ item, size, onPress }: Props) {
  return (
    <Pressable
      // `pressed` dims and slightly shrinks the card so a tap has visible
      // feedback before the navigation transition starts.
      style={({ pressed }) => [
        styles.card,
        { width: size },
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress(item.id)}
      // Announced by screen readers as "Calls, button" rather than just the
      // raw image, so the grid is usable without sight.
      accessibilityRole="button"
      accessibilityLabel={item.label}>
      <View style={styles.imageWrap}>
        <Image
          source={item.image}
          // `contain` keeps every tile at its own aspect ratio inside the same
          // square box, so no artwork is stretched or cropped.
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {item.label}
      </Text>
    </Pressable>
  );
}

/**
 * `memo` stops every card from re-rendering when only one of them changes.
 * The parent passes a stable `onPress` via `useCallback`, so the comparison
 * actually holds.
 */
export default memo(AppTile);

const styles = StyleSheet.create({
  card: {
    // Slightly taller than wide, matching the reference design: the artwork is
    // square and the caption sits in the extra height below it. Pairing an
    // aspect ratio with the width the parent passes avoids hard-coding a
    // height, so the card scales with the screen.
    aspectRatio: 0.82,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    // Soft lift: `elevation` on Android, the shadow properties on iOS.
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
  imageWrap: {
    // The image box takes the free vertical space, which leaves the caption
    // pinned just below it on every card regardless of card size.
    flex: 1,
    width: '76%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    marginTop: spacing.sm,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
