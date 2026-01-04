import { commandHelp } from './command_help.js';
import { commandExit } from './command_exit.js';
import { commandMapForward, commandMapBack } from './command_map.js';
import type { CLICOMMAND } from './state.js';

export function getCommands(): Record<string, CLICOMMAND> {
  return {
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
    exit: {
      name: 'exit',
      description: 'Exit the Pokedex',
      callback: commandExit,
    },
    map: {
      name: 'map',
      description: 'Get the next page of Locations ',
      callback: commandMapForward,
    },
    mapb: {
      name: 'mapb ',
      description: 'Get the previous page of location',
      callback: commandMapBack,
    },
  };
}
