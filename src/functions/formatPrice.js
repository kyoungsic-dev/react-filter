export const formatPrice = price => {
  // 100의 자리까지 반올림
  price = Math.round(price / 100) * 100;
  // 천 단위 기호 추가
  return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
