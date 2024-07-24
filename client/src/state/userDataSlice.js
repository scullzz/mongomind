import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


const initialState = {
    info: {},
}

const fetchUserInfoSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder)=> {
        builder.addCase(fetchUserInfoAsync.pending, ()=>{
            console.log("Fetching data...");
        }).addCase(fetchUserInfoAsync.fulfilled, (state, action)=>{
            state.info = action.payload;
        })
    }
})

const fetchAsync = async (jwt) => {
    try{
        const response = await fetch(
            "http://localhost:8000/mongomind/func/getUser",{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:  `Bearer ${jwt}`
                },
            }
        )
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else{
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
    }catch(err){
        console.log(err);
    }
}
export const fetchUserInfoAsync = createAsyncThunk(
    "user/fetchUserInfoAsync", fetchAsync
)
export default fetchUserInfoSlice.reducer;