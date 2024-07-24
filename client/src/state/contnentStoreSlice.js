import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    content: [],
}

const contentStoreSlice = createSlice({
    name: "dstore",
    initialState: initialState,
    reducers: {
        setDStore: (state, action)=> {
            state.content.push(action.payload);
        },
        fullDReplaceStore: (state, action)=> {
            state.content = action.payload;
        },
        clearStore: (state)=>{
            state.content = ["cursor"];
        }
    }
});

export const {setDStore, fullDReplaceStore, clearStore} = contentStoreSlice.actions;
export default contentStoreSlice.reducer;