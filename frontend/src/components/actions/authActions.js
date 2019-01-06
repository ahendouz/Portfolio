import { TEST_DISPSTCH } from "./types";

//register user
export const signupUser = userData => {
  return {
    type: TEST_DISPSTCH,
    payload: userData
  };
};
