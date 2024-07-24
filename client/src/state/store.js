import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import fetchReducer from "./fetchDataSlice"
import dstoreReducer from "./contnentStoreSlice"
import tableStoreReducer from "./tableSlice"
import fetchUser from "./userDataSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        fetch: fetchReducer,
        dstore: dstoreReducer,
        table: tableStoreReducer,
        user: fetchUser,
    },
})