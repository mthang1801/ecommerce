import orderedActionTypes from "./ordered.types";

const INITIAL_STATE = {
  orderedDetail: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderedActionTypes.ORDERED_DETAIL:
      return {
        ...state,
        orderedDetail: { ...action.payload },
      };
    default:
      return state;
  }
};
