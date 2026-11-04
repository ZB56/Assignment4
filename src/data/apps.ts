/**
 * The five tiles rendered by the grid.
 *
 * Keeping the data in its own module means the home screen only has to worry
 * about layout and the detail screen only has to worry about presentation —
 * adding a sixth tile is a one-entry change here and nothing else.
 *
 * The `message` strings are the ones named in the assignment directions.
 *
 * The artwork in `assets/` comes from Icons8 (https://icons8.com), used under
 * their free licence.
 *
 * @format
 */

import type { AppItem } from '../types';

export const APP_ITEMS: AppItem[] = [
  {
    id: 'calls',
    label: 'Calls',
    image: require('../../assets/calls.png'),
    message: 'Make calls from Here',
  },
  {
    id: 'camera',
    label: 'Camera',
    image: require('../../assets/camera.png'),
    message: 'Welcome to the camera app',
  },
  {
    id: 'messages',
    label: 'Messages',
    image: require('../../assets/messages.png'),
    message: 'Welcome to your Messages',
  },
  {
    id: 'music',
    label: 'Music',
    image: require('../../assets/music.png'),
    message: 'Welcome to the Music Selection Screen',
  },
  {
    id: 'photos',
    label: 'Photos',
    image: require('../../assets/photos.png'),
    message: 'Welcome to the Photos Screen',
  },
];

/** Look one tile up by id. Used by the detail screen after navigation. */
export function findAppItem(id: string): AppItem | undefined {
  return APP_ITEMS.find(item => item.id === id);
}
