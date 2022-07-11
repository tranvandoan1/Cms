import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, getAll, remove, upload } from "../../API/SongAPI";
export const getSong = createAsyncThunk("songs/getSongSlice", async () => {
  const { data: songs } = await getAll();
  return songs;
});
export const addSong = createAsyncThunk("songs/addSong", async (data: any) => {
  await add(data);
  const { data: songs } = await getAll();
  return songs;
});
export const uploadSong = createAsyncThunk(
  "songs/uploadSong",
  async (data: any) => {
    await upload(data.id, data.data);
    const { data: songs } = await getAll();
    return songs;
  }
);

export const removeSong = createAsyncThunk(
  "songs/removeSong",
  async (id: any) => {
    await remove(id);
    const { data: songs } = await getAll();
    return songs;
  }
);

const songSlices = createSlice({
  name: "songs",
  initialState: {
    value: [],
  },
  reducers: {
    removeSongg(state: any, action: any) {
      state.value = action.payload;
    },
    uploadSongg(state: any, action: any) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSong.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadSong.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeSong.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addSong.fulfilled, (state, action) => {
      state.value = action.payload;
    });
 
  },
});
export const { removeSongg, uploadSongg } = songSlices.actions;

export default songSlices.reducer;
