import orderedActionTypes from "./ordered.types";

export const orderedDetail = (ordered) => ({
  type: orderedActionTypes.ORDERED_DETAIL,
  payload: ordered,
});
