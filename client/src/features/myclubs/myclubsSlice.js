import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler } from "../../util/reactToastify";

const initialState = {
  value: [],
  loading: false,
};

export const myclubsSlice = createSlice({
  name: "myclubs",
  initialState: initialState,
  reducers: {
    setMyclubs: (state, { payload }) => {
      state.value = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setMyclubs, setLoading } = myclubsSlice.actions;

export default myclubsSlice.reducer;

export const fetchMyClubs = () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const { data } = await axios({
        url: "http://localhost:3000/clubs/my-clubs",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(data);
      dispatch(setMyclubs(data));
      dispatch(setLoading(false));
    } catch (error) {
      const message = error.response.data.message || error.message;
      errorHandler(message);
    }
  };
};
