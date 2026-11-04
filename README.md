# Grid Layout App — ACS 5413 Assignment 4

A React Native mobile app whose home screen mimics a grid layout of app tiles.
Tapping a tile navigates to that item's own screen, and the back arrow in the
header returns to the grid.

## Screens

| Tile | Destination message |
| --- | --- |
| Calls | Make calls from Here |
| Camera | Welcome to the camera app |
| Messages | Welcome to your Messages |
| Music | Welcome to the Music Selection Screen |
| Photos | Welcome to the Photos Screen |

## How the layout works

The grid is a `FlatList` with `numColumns={2}`. The card width is not a fixed
number — the home screen reads the live window width with
`useWindowDimensions`, subtracts the gutters, and divides the remainder between
the columns. That is what keeps the two columns evenly spaced across different
screen sizes and after a rotation.

Row spacing is Flexbox: `columnWrapperStyle` uses `gap` for the space between
the two columns and `justifyContent: 'flex-start'` so the final row — which
holds a single card, since there are five tiles — sits in the left column
instead of being centred or stretched.

## Navigation

Navigation uses a `@react-navigation/native-stack` navigator with two routes,
`Home` and `Detail`. There is one `Detail` route rather than five: the home
screen passes the tapped tile's id as a route parameter, and the detail screen
looks the item up to decide its header title and its message. Adding a sixth
tile is a one-entry change in `src/data/apps.ts` and needs no new route.

The native stack draws a back arrow in the header of any screen pushed above
the first, which is the visible top-of-screen back control.

## Project structure

```
App.tsx                      Navigation container and stack definition
assets/                      Tile artwork (PNG)
src/theme.ts                 Colours, spacing, and corner radii
src/types.ts                 AppItem and the typed route list
src/data/apps.ts             The five tiles and their messages
src/components/AppTile.tsx   One card: image with its caption beneath
src/screens/HomeScreen.tsx   The grid
src/screens/DetailScreen.tsx The message screen
```

## Credits

The tile artwork in `assets/` comes from [Icons8](https://icons8.com), used
under their free licence, which the assignment permits ("You can use
icons/images from the internet").

## Running it

```
npm install
npm start          # Metro bundler
npm run android    # build and install on a running emulator or device
```

## Checks

```
npx tsc --noEmit   # TypeScript
npx eslint .       # ESLint
npm test           # Jest
```
