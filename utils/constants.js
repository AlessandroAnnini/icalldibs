export const buildings = [
  {
    label: 'Viale Minzoni',
    value: '1',
  },
  {
    label: 'Via Pellegrini',
    value: '2',
  },
];

const makeSeats = (n) =>
  Array.from(Array(n).keys()).map((i) => {
    const value = (i + 1).toString();
    return { label: value, value };
  });

export const seats = {
  1: makeSeats(10),
  2: makeSeats(20),
};
