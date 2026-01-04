import { createInterface, type Interface } from 'readline';
import { getCommands } from './commands.js';
import { PokeAPI } from './pokeapi.js';
export type CLICOMMAND = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICOMMAND>;
  pokeApi: PokeAPI;
  nextLocationURL: string;
  previousLocationURL: string;
};

export function initState(cacheInterval: number) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'pokedex >',
  });

  return {
    readline: rl,
    commands: getCommands,
    pokeApi: new PokeAPI(cacheInterval),
    nextLocationURL: '',
    previousLocationURL: '',
  };
}
