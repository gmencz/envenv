export default function generateRandomJitter(min: number, max: number): number {
  const ceiledMin = Math.ceil(min);
  const flooredMax = Math.floor(max);
  return Math.floor(Math.random() * (flooredMax - ceiledMin)) + ceiledMin;
}
