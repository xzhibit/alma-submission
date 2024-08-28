import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchUserData } from "./userdataAPI";

export interface SingleUser {
    first_name?: string;
    last_name?: string;
    submitted?: string;
    email?: string;
    linkedin_url?: string;
    country?: string;
    visa_categories?: string;
    message: string;
    status?: string;
    resume?: string;
}
export interface UserDataSliceState {
  data: SingleUser[];
  status: "idle" | "loading" | "failed";
}

const initialState: UserDataSliceState = {
  data: [],
  status: "loading",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const userDataSlice = createAppSlice({
  name: "userdata",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    markReachedOut: create.reducer((state, action: PayloadAction<string>) => {
        const dataCopy = JSON.parse(JSON.stringify(state.data));
        for (let i in dataCopy) {
            if (dataCopy[i].email == action.payload.email) {
                dataCopy[i]["status"] = "REACHED_OUT";
                console.log(dataCopy);
                
            }
        }
        state.data = JSON.parse(JSON.stringify(dataCopy));        
    }),
    appendData: create.reducer((state, action: PayloadAction<SingleUser>) => {
      console.log("IN REDUCER")  
      console.log(JSON.stringify(action.payload));
        state.data = [...state.data, action.payload];
        console.log("STATE")
        console.log(JSON.stringify(state));
    }),
    fetchData: create.asyncThunk(
      async () => {
        const response = await fetchUserData();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.data = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectData: (userData) => userData.data,
    selectStatus: (userData) => userData.status,
  },
});

// Action creators are generated for each case reducer function.
export const { markReachedOut, appendData, fetchData } = userDataSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectData, selectStatus } = userDataSlice.selectors;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
