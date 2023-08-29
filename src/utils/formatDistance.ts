export const formatDistance = (num: number): string => {
  if (num < 1000) return num.toString();
  else if (num < 10000) return `${num / 1000}천`;
  else return `${num / 10000}만`;
};
