import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
    data: {},
}

const fetchDataSlice = createSlice({
    name: "fetch",
    initialState,
    extraReducers: (builder)=> {
        builder.addCase(finallyFetchAsync.pending, ()=> {
            console.log("Fetching data...");
        }).addCase(finallyFetchAsync.fulfilled, (state, action)=> {
            state.data = action.payload;
        })
    }
})



const fetchAsync = async (jwt) => {
    try {
        const response = await fetch(
          "http://localhost:8000/mongomind/func/getTask",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (err) {
        console.error(err);
      }
};

export const finallyFetchAsync = createAsyncThunk(
    "fetch/finallyFetchAsync", fetchAsync
)
export default fetchDataSlice.reducer;