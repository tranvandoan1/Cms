import { configureStore } from "@reduxjs/toolkit";
import StagePlot from "../Slide/StagePlot";


const Store = configureStore({
    reducer:{
        StagePlot: StagePlot.reducer
    }
})

export default Store