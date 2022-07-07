import { configureStore } from "@reduxjs/toolkit";
import artistsSlice from "../Features/ArtistSlice/ArtistSlice";
import StagePlot from "../views/Slide/StagePlot";
export const store = configureStore({
  reducer: {
    artist: artistsSlice,
    StagePlot: StagePlot.reducer
  },
});
export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch