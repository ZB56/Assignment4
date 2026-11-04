/**
 * HomeScreen — the grid.
 *
 * `FlatList` with `numColumns={2}` does the grid; Flexbox does the spacing.
 * The card width is derived from the live window width rather than being a
 * fixed number, so the same two columns stay evenly spaced on a small phone,
 * a large phone, and in landscape.
 *
 * @format
 */

import { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppTile from '../components/AppTile';
import { APP_ITEMS } from '../data/apps';
import { colors, spacing } from '../theme';
import type { AppItem, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

/** Columns in the grid. */
const COLUMNS = 2;
/** Gap between cards, and between the cards and the screen edge. */
const GUTTER = spacing.md;

export default function HomeScreen({ navigation }: Props) {
  // Re-measured on rotation, so the layout follows the window.
  const { width } = useWindowDimensions();

  // Total horizontal space the gutters consume: one on each outer edge plus
  // one between each pair of columns. Whatever is left is split evenly.
  const gutterSpace = GUTTER * (COLUMNS + 1);
  const cardSize = Math.floor((width - gutterSpace) / COLUMNS);

  /**
   * Navigate to the detail screen, passing only the id. The detail screen
   * looks the full item up, which keeps the navigation parameters small and
   * serialisable.
   *
   * `useCallback` keeps this function identity stable so the memoised tiles
   * do not re-render on every pass.
   */
  const handlePressItem = useCallback(
    (itemId: string) => {
      navigation.navigate('Detail', { itemId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: AppItem }) => (
      <AppTile item={item} size={cardSize} onPress={handlePressItem} />
    ),
    [cardSize, handlePressItem],
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={APP_ITEMS}
        renderItem={renderItem}
        // Each tile has a unique id, so rows keep their identity across
        // re-renders instead of React falling back to array indices.
        keyExtractor={item => item.id}
        numColumns={COLUMNS}
        // `key` forces FlatList to rebuild if the column count ever changes;
        // it refuses to change `numColumns` on the fly otherwise.
        key={`grid-${COLUMNS}`}
        // Applied to each row. `flex-start` is deliberate: the last row holds
        // a single card, and it should sit in the left column rather than be
        // centred or stretched across the full width.
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.title}>My Apps</Text>
            <Text style={styles.subtitle}>Tap a tile to open it</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: GUTTER,
    paddingBottom: spacing.xl,
  },
  listHeader: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 15,
    color: colors.textMuted,
  },
  row: {
    justifyContent: 'flex-start',
    // `gap` spaces the two columns without needing a margin on the cards,
    // which would otherwise throw the outer edges off by a half-gutter.
    gap: GUTTER,
    marginBottom: GUTTER,
  },
});
