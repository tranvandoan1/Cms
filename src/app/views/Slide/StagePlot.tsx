import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { filter, garbage, getAll, remove } from "../Api/StagePlot";

const initialState = {
    StagePlot: [],
    loading: false,
    min:0,
    max:0
}

export const getStagePlot = createAsyncThunk(
    "StagePlot/get",
    async () =>{
        const {data} = await getAll();
        return data
    }
)

export const garbageStagePlot = createAsyncThunk(
    "StagePlot/garbage",
    async(item) =>{
        const {data} = await garbage(item)
        console.log(data);
        
        return data
    }
) 


export const removeStagePlot = createAsyncThunk(
    "StagePlot/remove",
    async (id:any) =>{
        const {data} = await remove(id)
        return data
    }
)

export const filterStagePlot = createAsyncThunk(
    "StagePlot/filter",
    async(value:string) =>{
        const {data} = await filter(value)
        return data
    }
)

const StagePlot = createSlice({
    name: 'StagePlot',
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>{
      builder.addCase(getStagePlot.fulfilled, (state:any,action:any) =>{
        state.StagePlot = action.payload
      });
      
      builder.addCase(filterStagePlot.fulfilled, (state:any,action:any) =>{
        state.StagePlot = action.payload
      });
      
      builder.addCase(removeStagePlot.fulfilled, (state:any,action:any) =>{
        const newStagePlot:any = state.StagePlot.filter((item:any)  => item.id !== action.payload.id);
        state.StagePlot = newStagePlot
      });
    }
})

export default StagePlot