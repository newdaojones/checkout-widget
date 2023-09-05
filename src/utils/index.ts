import { CheckoutInfo } from "../types/checkout.type";

export const calcTip = (checkoutInfo: CheckoutInfo) => {
  if (!checkoutInfo.tipAmount) {
    return 0;
  }

  if (checkoutInfo.tipType === "cash") {
    return Number(checkoutInfo.tipAmount);
  }

  return checkoutInfo.cost
    ? Number(checkoutInfo.cost) +
        (Number(checkoutInfo.cost) * Number(checkoutInfo.tipAmount || 0)) / 100
    : 0;
};
