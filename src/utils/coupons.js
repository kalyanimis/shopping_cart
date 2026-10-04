'use strict';

/** Promotional codes. Percent coupons take a share of the subtotal, flat ones a fixed amount. */
const COUPONS = {
  WELCOME10: { type: 'percent', value: 10 },
  FESTIVE15: { type: 'percent', value: 15 },
  FLAT500: { type: 'flat', value: 500 },
};

function findCoupon(code) {
  return COUPONS[code.toUpperCase()] || null;
}

/** Returns the totals with the coupon's `discount` taken off `total`. */
function applyCoupon(totals, code) {
  const coupon = code ? findCoupon(code) : null;
  if (!coupon) return { ...totals, discount: 0, coupon: null };
  const discount =
    coupon.type === 'percent' ? (totals.subtotal * coupon.value) / 100 : coupon.value;
  return { ...totals, discount, coupon: code, total: totals.total - discount };
}

module.exports = { COUPONS, findCoupon, applyCoupon };
