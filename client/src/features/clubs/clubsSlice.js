import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler } from "../../util/reactToastify";

const initialState = {
  value: [],
  loading: false,
};

export const clubsSlice = createSlice({
  name: "clubs",
  initialState: initialState,
  reducers: {
    setClubs: (state, { payload }) => {
      state.value = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setClubs, setLoading } = clubsSlice.actions;

export default clubsSlice.reducer;

export const fetchClubs = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        url: "http://localhost:3000/clubs/league/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(data);
      dispatch(setClubs(data));
    } catch (error) {
      const message = error.response.data.message || error.message;
      errorHandler(message);
    }
  };
};
