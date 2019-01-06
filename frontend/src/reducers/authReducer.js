import { TEST_DISPSTCH } from "../components/actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPSTCH:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
