import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, getAll, remove, upload } from "../../API/SetListAPI";
export const getSetList = createAsyncThunk("setLists/getSetList", async () => {
  const { data: SetLists } = await getAll();
  return SetLists;
});
export const addSetList = createAsyncThunk(
  "setLists/addSetList",
  async (data: any) => {
    await add(data);
    const { data: SetLists } = await getAll();
    return SetLists;
  }
);
export const uploadSetList = createAsyncThunk(
  "setLists/uploadSetList",
  async (data: any) => {
    console.log(data)
    await upload(data.id, data.data);
    const { data: setLists } = await getAll();
    return setLists;
  }
);
export const editSetList = createAsyncThunk(
  "member/editSetList",
  async (data: any) => {
    await upload(data.id, data);
    const { data: setLists } = await getAll();
    return setLists;
  }
);
export const removeSetList = createAsyncThunk(
  "setLists/removeSetList",
  async (id: any) => {
    await remove(id);
    await getAll();
    const { data: SetLists } = await getAll();
    return SetLists;
  }
);

const setListsSlice = createSlice({
  name: "setLists",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSetList.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeSetList.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addSetList.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadSetList.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(editSetList.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default setListsSlice.reducer;
