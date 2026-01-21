import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./slices/placesSlice"
import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice";
import  adminPlacesSlice  from "./slices/adminSlice";


export const store = configureStore({
    reducer: {
        adminPlaces: adminPlacesSlice,
        user: userReducer,
        auth: authReducer,
        placesState: placesReducer,
    }
})