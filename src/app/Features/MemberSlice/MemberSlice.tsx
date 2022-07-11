import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, getAll, remove, upload } from "../../API/MemberAPI";
export const getMember = createAsyncThunk("member/getMember", async () => {
  const { data: members } = await getAll();
  return members;
});
export const addMember = createAsyncThunk(
  "member/addMember",
  async (data: any) => {
    await add(data);
    const { data: members } = await getAll();
    return members;
  }
);
export const uploadMember = createAsyncThunk(
  "member/uploadMember",
  async (data: any) => {
    console.log(data);
    await upload(data.id, data.data);
    const { data: members } = await getAll();
    return members;
  }
);

export const removeMember = createAsyncThunk(
  "member/removeMember",
  async (id: any) => {
    await remove(id);
    const { data: members } = await getAll();
    return members;
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    value: [],
  },
  reducers: {
    removeMemberr(state: any, action: any) {
      state.value = action.payload;
    },
    uploadMemberr(state: any, action: any) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMember.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeMember.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addMember.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadMember.fulfilled, (state, action) => {
      state.value = action.payload;
    });

  },
});
export const { removeMemberr, uploadMemberr } = memberSlice.actions;

export default memberSlice.reducer;
