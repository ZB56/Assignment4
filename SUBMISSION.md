# Canvas submission — Assignment 4

## Status

| Direction | Status |
| --- | --- |
| UI mimicking the Grid Layout in the provided image | Done |
| Icons/images on each card | Done — artwork generated for this project |
| Dynamic screen navigation on tapping an item | Done — native stack, one `Detail` route |
| The five required messages on the detail screens | Done — wording matches the directions |
| Back button visible at the top | Done — native stack header back arrow |
| Screen record a demo in the AVD | **You** — needs screen-recording software (Kaltura) |
| Upload the video to a cloud service | **You** — needs your OU OneDrive login |
| Upload the project code to GitHub | Done — https://github.com/ZB56/Assignment4 (private) |
| Submit both share links on Canvas | **You** — needs the links first |

## Rubric coverage

| # | Criterion | Where it lives |
| --- | --- | --- |
| 1 | Grid layout, responsive, evenly spaced (20) | `src/screens/HomeScreen.tsx` — `FlatList` with `numColumns={2}`; card width derived from `useWindowDimensions`, not hard-coded |
| 2 | Images on card (10) | `src/components/AppTile.tsx` — `Image` with `resizeMode="contain"` in a fixed square box, so no tile is stretched |
| 3 | Text on card (10) | `AppTile.tsx` — caption directly below the image, centred, single line |
| 4 | UI replicates the design (10) | Same five tiles, two columns, white cards on a light grey background, last row left-aligned |
| 5 | Back option and navigation (10) | `App.tsx` — native stack header back arrow on every detail screen |
| 6 | Text on navigation screens (10) | `src/data/apps.ts` — the five messages, wording taken from the directions |
| 7 | Code commenting (10) | Every file; comments explain *why*, not just *what* |
| 8 | Functioning program (10) | Verified on the AVD: no crashes, no JS console output, no redbox. TypeScript, ESLint, and Jest all pass |
| 9 | Video demonstration (10) | **Yours to record** |

## Verified on the emulator

Ran on `ACS5413_Pixel8_API37`. All five tiles were tapped and each showed the
correct header title and message, and the header back arrow returned to the
grid every time:

- Calls -> Make calls from Here
- Camera -> Welcome to the camera app
- Messages -> Welcome to your Messages
- Music -> Welcome to the Music Selection Screen
- Photos -> Welcome to the Photos Screen

Checks: `npx tsc --noEmit` clean, `npx eslint .` clean, `npm test` passing.

## Before you record the demo

A Metro dev server for your **EventPassBooking** project was already running on
port 8081, and the emulator reaches the host at `10.0.2.2:8081` — so this app
was being served that project's bundle. Rather than stop your other server, this
app's dev-server setting on the emulator was pointed at port 8082.

To go back to the standard setup, stop the EventPassBooking Metro, then run:

```
adb shell run-as com.assignment4 rm shared_prefs/com.assignment4_preferences.xml
```

Otherwise just start Metro here with `npx react-native start --port 8082` and
leave the setting as it is.

The emulator was also granted `ACCESS_LOCAL_NETWORK`, which Android 16 requires
before a debug build can reach the Metro dev server. It is a debug-only
permission and is not in the app's manifest.

> The GitHub repo is **private**. Your instructor will get a 404 unless you add
> them as a collaborator or make the repo public — see step 3 below. This is the
> same thing to check on Assignment 3's repo, `ZB56/ou-todo-list`.

## Remaining steps

1. Record the demo: launch the app, tap each of the five tiles, and use the back
   arrow after each one.
2. Upload the recording to your OU OneDrive and copy the share link.
3. **Give your instructor access to the repo.** It is private, so the link
   below will 404 for them until you do. Either add them under
   Settings -> Collaborators, or make it public with:

   ```
   gh repo edit ZB56/Assignment4 --visibility public --accept-visibility-change-consequences
   ```
4. Paste both links into the text below and submit on Canvas.

## Text to paste into Canvas

**Assignment 4 — UI to mimic grid layout**

Demo Video: `<paste your OneDrive share link here>`

GitHub Project: https://github.com/ZB56/Assignment4

**Overview**

A React Native app whose home screen mimics the grid layout from the assignment
image: a two-column grid of app tiles, each a card with an image and a caption
beneath it. Tapping a tile navigates to that item's screen, and the back arrow
at the top of that screen returns to the grid.

- **Grid layout:** the grid is a `FlatList` with `numColumns={2}`. The card
  width is not a fixed number — the home screen reads the live window width
  with `useWindowDimensions`, subtracts the gutters, and divides what is left
  between the columns, so the two columns stay evenly spaced on different
  screen sizes and after a rotation. Row spacing is Flexbox: `columnWrapperStyle`
  uses `gap` between the columns and `justifyContent: 'flex-start'` so the last
  row, which holds a single card, sits in the left column.
- **Cards:** each card renders its image with `resizeMode="contain"` inside a
  fixed square box, so every tile keeps its own aspect ratio without being
  stretched or cropped, with the caption directly below it.
- **Dynamic navigation:** a `@react-navigation/native-stack` navigator with two
  routes, `Home` and `Detail`. There is one `Detail` route rather than five —
  the home screen passes the tapped tile's id as a route parameter, and the
  detail screen looks the item up to decide its header title and message. The
  route list is typed, so a wrong route name or parameter is a compile error.
- **Back button:** the native stack draws a back arrow in the header of any
  screen pushed above the first, so it is visible at the top of all five detail
  screens and returns the user to the grid.
- **Detail screens:** kept simple, as the directions ask — the tile's image, its
  message, and a line pointing at the back arrow.

The project passes TypeScript type checking, ESLint, and its Jest test, and runs
on the Android emulator with no crashes and no console errors.

## Project location

The project lives at `~/Developer/Assignment4`, not on the Desktop, for the same
reason as Assignment 3: iCloud's sync daemon contends with Gradle over the same
files and stalls the Android build.
