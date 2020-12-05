import { drumBank } from '../drum-bank';

const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

export const createBank = (bankNumber) => {
  return drumBank[bankNumber].sounds.map((bank, i) => {
    return {
      ...bank,
      key: keys[i],
    };
  });
};
