export const timeCountDown = (endTime) => {
  const getTime = new Date(endTime).getTime() - Date.now();
  if (getTime < 0) {
    return null;
  }
  const realDates = getTime / 86400 / 1000;
  const getDates = Math.floor(realDates);
  const realHours = (realDates - getDates) * 24;
  const getHours = Math.floor(realHours);
  const realMinutes = (realHours - getHours) * 60;
  const getMinutes = Math.floor(realMinutes);
  const getSeconds = Math.floor((realMinutes - getMinutes) * 60);
  let d = getDates;
  let h = getHours;
  let m = getMinutes;
  let s = getSeconds;
  if (d == 0) {
    d = "";
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  const timeString = d
    ? `${d} ngày:${h} giờ:${m} phút:${s} giây`
    : `${h} giờ:${m} phút:${s} giây`;
  return {
    dates: d,
    hours: h,
    minutes: m,
    seconds: s,
    timeString,
  };
};
export const addProductToCart = (product) => ({
  _id: product._id,
  ship_fee: product.ship_fee,
  fast_delivery: product.fast_delivery,
  store_quantity: product.quantity,
  name: product.name,
  price: product.price,
  discount: product.discount.value,
  label: product.label,
  image: product.images[0],
  creator:
    product.user.information.first_name +
    " " +
    product.user.information.last_name,
});
