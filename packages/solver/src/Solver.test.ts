import { literaki, scrabble } from '@scrabble-solver/configs';
import { dictionaries } from '@scrabble-solver/dictionaries';
import { Board, Locale, Result, Tile } from '@scrabble-solver/types';

import Solver from './Solver';

const generateTiles = (characters: string[]): Tile[] => {
  return characters.map((character) => new Tile({ character, isBlank: false }));
};

const getBestResult = ([firstResult, ...results]: Result[]): Result => {
  return results.reduce(
    (bestResultCandidate, result) => (result.points > bestResultCandidate.points ? result : bestResultCandidate),
    firstResult,
  );
};

describe('Solver - PL', () => {
  const locale = Locale.PL_PL;
  const config = literaki[locale];
  let solver: Solver | undefined;

  beforeAll(() => {
    return dictionaries.get(locale).then((trie) => {
      solver = new Solver(config, trie);
    });
  });

  it('żyło', () => {
    const board = Board.fromStringArray([
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '   żyło        ',
      '               ',
      '               ',
      '               ',
    ]);
    const tiles = generateTiles(['l', 'i', 'n', 'o']);
    const results = solver!.solve(board, tiles);
    expect(results.length).toBe(61);
  });

  it('zmartwychwstałą x9', () => {
    const board = Board.fromStringArray([
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '       n       ',
      '       armia   ',
      '       p   miot',
      '       ośka   r',
      '     boi  n   w',
      ' deski   po  da',
      ' or o    in fał',
      ' m  twych s  ł ',
      '               ',
      '               ',
    ]);
    const tiles = generateTiles(['a', 'a', 'ą', 'r', 't', 'w', 'z']);
    const results = solver!.solve(board, tiles);
    const bestResult = getBestResult(results);
    expect(bestResult.word).toBe('zmartwychwstałą');
    expect(bestResult.points).toBe(682);
  });

  it('zmartwychwstałą x24', () => {
    const board = Board.fromStringArray([
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '       ś   miot',
      '     s piska  r',
      '     p i      w',
      'j  fiolę j   da',
      'as o iw  au  ał',
      ' mar  y   stał ',
      'da do    ot    ',
      'ar  ń    m     ',
    ]);
    const tiles = generateTiles(['ą', 'c', 'h', 't', 'w', 'w', 'z']);
    const results = solver!.solve(board, tiles);
    const bestResult = getBestResult(results);
    expect(bestResult.word).toBe('zmartwychwstałą');
    expect(bestResult.points).toBe(1157);
  });
});

describe('Solver - ES', () => {
  const locale = Locale.ES_ES;
  const config = scrabble[locale];
  let solver: Solver | undefined;

  beforeAll(() => {
    return dictionaries.get(locale).then((trie) => {
      solver = new Solver(config, trie);
    });
  });

  it('llana', () => {
    const board = Board.fromStringArray([
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
      '               ',
    ]);
    const tiles = generateTiles(['ll', 'a', 'n', 'a']);
    const results = solver!.solve(board, tiles);
    const bestResult = getBestResult(results);
    expect(results.length).toBe(24);
    expect(bestResult.points).toBe(22);
  });
});
