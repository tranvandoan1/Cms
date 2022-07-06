import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, getAll, remove, upload } from "../../API/SetListAPI";
export const getSetList = createAsyncThunk("setLists/getSetList", async () => {
  const { data: SetLists } = await getAll();
  return SetLists;
});
export const addSetList = createAsyncThunk(
  "setLists/getSetList",
  async (data: any) => {
    const { data: SetLists } = await add(data);
    console.log(SetLists);
  }
);
export const uploadSetList = createAsyncThunk(
  "setLists/uploadSetList",
  async (data: any) => {
    await upload(data.id, data.data);
  }
);
export const removeSetList = createAsyncThunk(
  "setLists/uploadSetList",
  async (id: any) => {
    await remove(id);
    const { data: SetLists } = await getAll();
    console.log(SetLists);
    return SetLists;
  }
);

const setListsSlice = createSlice({
  name: "setLists",
  initialState: {
    value: [],
  },
  reducers: {
    removeSetListt(state: any, action: any) {
      state.value = action.payload;
    },
    uploadSetListt(state: any, action: any) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSetList.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { removeSetListt, uploadSetListt } = setListsSlice.actions;

export default setListsSlice.reducer;
