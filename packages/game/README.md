# Hanab Live Game Logic

This package contains the rules for the game of Hanab. These are exported as functions like `isCardTouchedByClue`, `isCardOnChop`, and so on.

You can see the full list of things that this library provides in the [auto-generated documentation](https://hanabi-live.github.io/hanabi-live/).

The main export of this library is the `gameReducer` function, which can compute the next game state from an existing game state and a game action.

<br>

## Installation

If you want to use the game logic in a bot or some other Hanab-related program, then you can install it from npm:

```sh
npm install @hanabi-live/game --save
```

The package also has some optional peer dependencies:

- If you need to import types (like e.g. `CardOrder`), then you need to install [Zod](https://zod.dev/): `npm install zod --save`
- If you need to use the reducer functions to compute new game states, then you need to install [Immer](https://immerjs.github.io/immer/): `npm install immer --save`

<br>

## Usage

Here is an example of a JavaScript/TypeScript program using the `gameReducer` function to compute a game state:

```ts
import {
  draw,
  gameReducer,
  getDefaultMetadata,
  getInitialGameState,
} from "@hanabi-live/game";

const numPlayers = 2;
const metadata = getDefaultMetadata(numPlayers);
const initialGameState = getInitialGameState(metadata);

console.log(`First player has ${initialGameState.hands[0].length} cards.`); // Should print 0.

const action = draw(0, 0, 0, 1);
const nextGameState = gameReducer(
  initialGameState,
  action,
  true,
  false,
  false,
  false,
  metadata,
);

console.log(`First player now has ${initialGameState.hands[0].length} cards.`); // Should print 1.
```
