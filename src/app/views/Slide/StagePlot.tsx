import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { add, filter, garbage, get, getAll, remove } from "../Api/StagePlot";

const initialState = {
    StagePlot: [],
    loading: false,
    min:0,
    max:0
}

export const getAllStagePlot = createAsyncThunk(
    "StagePlot/getAll",
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

export const editStagePlot = createAsyncThunk(
    "StagePlot/edit",
    async(item:any)=>{
        console.log(item);
        const {data} = await axios.patch(`http://localhost:3001/StagePlot/${item.id}`,item)
        return data
    }
)


export const removeStagePlot = createAsyncThunk(
    "StagePlot/remove",
    async (id:any) =>{
        await remove(id)
        return id
    }
)

export const addStagePlot = createAsyncThunk(
    "StagePlot/add",
    async(item:any) =>{
        const {data} = await axios.post("http://localhost:3001/StagePlot",item)
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
      builder.addCase(getAllStagePlot.fulfilled, (state:any,action:any) =>{
        state.StagePlot = action.payload
      });
      
      builder.addCase(filterStagePlot.fulfilled, (state:any,action:any) =>{
        state.StagePlot = action.payload
      });
      
      builder.addCase(removeStagePlot.fulfilled, (state:any,action:any) =>{
        const newStagePlot:any = state.StagePlot.filter((item:any)  => item.id !== action.payload);
        state.StagePlot = newStagePlot        
      });

      builder.addCase(addStagePlot.fulfilled, (state:any,action:any) =>{
        state.StagePlot = [...state.StagePlot,action.payload]
      });

     builder.addCase(editStagePlot.fulfilled, (state:any,action:any) =>{
        const newProducts = state.StagePlot.map((item:any) =>
            item.id === action.payload.id ? action.payload : item
        ) 
        state.StagePlot = newProducts;
        })
    }
})

export default StagePlot