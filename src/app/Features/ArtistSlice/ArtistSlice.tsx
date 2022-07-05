import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, getAll, remove, upload } from "./../../API/ArtistAPI";
export const getArtist = createAsyncThunk("artists/getArtist", async () => {
  const { data: artists } = await getAll();
  return artists;
});
export const addArtist = createAsyncThunk(
  "artists/getArtist",
  async (data: any) => {
    const { data: artists } = await add(data);
    console.log(artists);
  }
);
export const uploadArtist = createAsyncThunk(
  "artists/uploadArtist",
  async (data: any) => {
    await upload(data.id, data.data);
  }
);
export const removeArtist = createAsyncThunk(
  "artists/uploadArtist",
  async (id: any) => {
    await remove(id);
    const { data: artists } = await getAll();
    console.log(artists);
    return artists;
  }
);

const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    value: [],
  },
  reducers: {
    removeArtistt(state: any, action: any) {
      state.value = action.payload;
    },
    uploadArtistt(state: any, action: any) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArtist.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { removeArtistt, uploadArtistt } = artistsSlice.actions;

export default artistsSlice.reducer;
