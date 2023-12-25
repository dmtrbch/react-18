import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { petApi } from "./petApiService";
import searchParams from "./searchParamsSlice";

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware)
});

export default store;
