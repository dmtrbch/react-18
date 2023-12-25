import { createSlice } from "@reduxjs/toolkit";

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: '',
      breed: '',
      animal: ''
    }
  },
  reducers: {
    all: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.value = action.payload
    }
  }
})

export const { all } = searchParamsSlice.actions
export default searchParamsSlice.reducer