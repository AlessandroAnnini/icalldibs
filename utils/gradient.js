// get random number between min and max
const rNo = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// let lastHue = randomNumber(0, 360);

// create random hsl color
const rCo = () => {
  // let hue = randomNumber(0, 360);
  // while (hue - lastHue < 60) {
  //   hue = randomNumber(0, 360);
  // }
  // lastHue = hue;
  const hue = rNo(50, 320);
  const saturation = rNo(70, 100);
  const lightness = rNo(20, 50);
  return `hsl(${hue}deg, ${saturation}%, ${lightness}%)`;
};

export const getRandomGradient = () =>
  `linear-gradient(
    ${rNo(0, 180)}deg,
    ${rCo()} ${rNo(20, 40)}%,
    ${rCo()} ${rNo(40, 80)}%
  )`;
