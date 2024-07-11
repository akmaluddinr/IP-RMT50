import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler } from "../../util/reactToastify";

const initialState = {
  value: [],
  loading: false,
};

export const leaguesSlice = createSlice({
  name: "leagues",
  initialState: initialState,
  reducers: {
    setLeagues: (state, { payload }) => {
      state.value = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setLeagues, setLoading } = leaguesSlice.actions;

export default leaguesSlice.reducer;

export const fetchLeagues = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        url: "http://localhost:3000/clubs/leagues",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setLeagues(data));
    } catch (error) {
      const message = error.response.data.message || error.message;
      errorHandler(message);
    }
  };
};
