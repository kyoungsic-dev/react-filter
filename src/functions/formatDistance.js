export const formatDistance = num => {
  if (num < 1000) return num;
  else if (num < 10000) return `${num / 1000}천`;
  else return `${num / 10000}만`;
};
