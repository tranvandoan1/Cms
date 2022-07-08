import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, getAll, remove, upload } from "./../../API/ArtistAPI";
export const getArtist = createAsyncThunk("artists/getArtist", async () => {
  const { data: artists } = await getAll();
  return artists;
});
export const addArtist = createAsyncThunk(
  "artists/addArtist",
  async (data: any) => {
    add(data);
    const { data: artists } = await getAll();
    return artists;
  }
);
export const uploadArtist = createAsyncThunk(
  "artists/uploadArtist",
  async (data: any) => {
    await upload(data.id, data.data);
    const { data: artists } = await getAll();
    return artists;
  }
);
export const removeArtist = createAsyncThunk(
  "artists/removeArtist",
  async (id: any) => {
    await remove(id);
    const { data: artists } = await getAll();
    return artists;
  }
);

const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    value: [],
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder.addCase(getArtist.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadArtist.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeArtist.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addArtist.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default artistsSlice.reducer;
