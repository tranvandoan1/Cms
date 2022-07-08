import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { edit, getAll, remove } from "../Api/Auth";

const initialState = {
    user: []
}

export const getAllUser = createAsyncThunk(
    "auth/getAll",
    async() =>{
        const {data} = await getAll()
        return data
    }
)

export const editUser = createAsyncThunk(
    "auth/edit",
    async(item:any)=>{
        const {data} = await edit(item)
        return data
    }
)

export const deleteUser = createAsyncThunk(
    "auth/delete",
    async(id:any)=>{
        // await remove(id)
        return id
    }
)


const AuthSlide = createSlice({
    name:"AuthSlide",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(getAllUser.fulfilled, (state:any,action:any)=>{
            state.user = action.payload
        });

        builder.addCase(editUser.fulfilled,(state:any,action:any)=>{
            const newUsers = state.user.map((item: any) =>
            item.id === action.payload.id ? action.payload : item
          );
          state.user = newUsers
        });
        
        builder.addCase(deleteUser.fulfilled,(state:any,action:any)=>{
            const newUser: any = state.user.filter(
                (item: any) => item.id !== action.payload
              );
              state.user = newUser;
        })
    },
})

export default AuthSlide