export const formatPrice = price => {
  const formattedPrice = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  return formattedPrice;
};
