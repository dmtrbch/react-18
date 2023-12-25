// if using redux go all the way with it by using redux toolkit query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      query: (id) => ({ url: "pets", params: { id } }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      transformResponse: (response) => response.pets[0],
    }),
    getBreeds: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      query: (animal) => ({ url: "breeds", params: { animal } }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      transformResponse: (response) => response.breeds,
    }),
    search: builder.query({
      query: ({ animal, location, breed }) => ({
        url: "pets",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        params: { animal, location, breed },
      }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      transformResponse: (response) => response.pets,
    }),
  }),
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
