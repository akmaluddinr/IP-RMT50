import { configureStore } from "@reduxjs/toolkit";

import leaguesReducer from "./features/leagues/leaguesSlice";
import clubsReducer from "./features/clubs/clubsSlice";

export default configureStore({
  reducer: {
    leagues: leaguesReducer,
    clubs: clubsReducer,
  },
});
