export enum gameModes {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
}


export const BoardParameters = {
  [gameModes.EASY]: {
    height: 11,
    width: 6,
    bombCount: 10,
  },

  [gameModes.NORMAL]: {
    height: 18,
    width: 11,
    bombCount: 35,
  },

  [gameModes.HARD]: {
    height: 25,
    width: 15,
    bombCount: 75,
  }
}


export enum CellColors {
  GREEN = 'green',
  DARK_GREEN = 'dark-green',
  BROWN = 'brown',
  DARK_BROWN = 'dark-brown',
}

export const NumberColors = {
  [-1]: '',
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'violet',
  5: 'orange',
  6: 'pink',
  7: 'yellow',
  8: 'gray'
}

export const MineColors = [
  'yellow',
  'green',
  'red',
  'pink',
  'orange',
  'blue'
]