/**
 * DetailScreen — the screen reached by tapping a tile.
 *
 * The directions ask for these screens to stay simple: show the message that
 * belongs to the tapped item. The back arrow at the top of the screen is
 * supplied by the native stack navigator (configured in App.tsx) and returns
 * the user to the grid.
 *
 * @format
 */

import { Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { findAppItem } from '../data/apps';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  // The home screen passes an id; resolve it back to the full item here.
  const item = findAppItem(route.params.itemId);

  // Defensive branch: this only fires if an id is ever passed that no longer
  // exists in the data, but it means a bad route shows a readable screen
  // instead of crashing on a property of `undefined`.
  if (!item) {
    return (
      <View style={styles.screen}>
        <Text style={styles.message}>Sorry, that screen is unavailable.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Image source={item.image} resizeMode="contain" style={styles.image} />
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.hint}>Use the back arrow above to return home.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: spacing.lg,
  },
  message: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  hint: {
    marginTop: spacing.md,
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
