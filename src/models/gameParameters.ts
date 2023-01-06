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