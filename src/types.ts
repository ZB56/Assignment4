/**
 * Shared types for the grid app.
 *
 * @format
 */

import type { ImageSourcePropType } from 'react-native';

/** One tile in the grid. */
export type AppItem = {
  /** Stable key — also the value passed through navigation. */
  id: string;
  /** Caption shown underneath the image on the card. */
  label: string;
  /** Bundled artwork for the tile. */
  image: ImageSourcePropType;
  /** Message the detail screen displays for this item. */
  message: string;
};

/**
 * Route list for the native stack.
 *
 * `Home` takes no parameters; `Detail` receives the id of the tile that was
 * tapped, which the detail screen uses to look the item up. Typing the stack
 * this way means a typo in a route name or parameter is a compile error rather
 * than a blank screen at runtime.
 */
export type RootStackParamList = {
  Home: undefined;
  Detail: { itemId: string };
};
