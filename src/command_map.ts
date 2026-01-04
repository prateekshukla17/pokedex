import type { State } from './state.js';

export async function commandMapForward(state: State) {
  const locations = await state.pokeApi.fetchLocations(state.nextLocationURL);

  state.nextLocationURL = locations.next;
  state.previousLocationURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}

export async function commandMapBack(state: State) {
  if (!state.previousLocationURL) {
    throw new Error("you're on the first page");
  }

  const locations = await state.pokeApi.fetchLocations(
    state.previousLocationURL
  );

  state.nextLocationURL = locations.next;
  state.nextLocationURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}
