import { configureStore } from "@reduxjs/toolkit";

import leaguesReducer from "./features/leagues/leaguesSlice";
import clubsReducer from "./features/clubs/clubsSlice";
import myclubsReducer from "./features/myclubs/myclubsSlice";

export default configureStore({
  reducer: {
    leagues: leaguesReducer,
    clubs: clubsReducer,
    myclubs: myclubsReducer,
  },
});
