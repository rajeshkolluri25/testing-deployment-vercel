import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders } from "../configuration/headers";

export const changePasswordRequestApi = createApi({
  reducerPath: "changePassword", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getHeaders().Authorization;
      console.log("token123", token);

      headers.set("Authorization", `${token}`);
      return headers;
    },
  }),
  tagTypes: ["changePassword"],

  endpoints: (builder) => ({
    changeCurrentPasswordRequest: builder.mutation({
      query: (requestData) => {
        console.log("Request Data:", getHeaders()); // Log the requestData here
        return {
          url: "/change/user/password",
          method: "POST",
          body: requestData,
          headers: getHeaders(),
        };
      },
      // invalidateTags: ["ResendOtpRequest"],
    }),
    createAgentOrBuilder: builder.mutation({
      query: (details) => ({
        url: "/builder",
        method: "POST",
        body: details,
      }),
    }),
    getAgentOrBuilder: builder.query({
      query: (userId) => {
        return {
          url: `/builder/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["UserRequest"], // Specify tags for caching
    }),
    updateAgentOrBuilder: builder.mutation({
      query: (details) => {
        const { id, ...payload } = details;
        return {
          url: `/builder/${id}`,
          method: "PUT",
          body: payload,
          headers: getHeaders(),
        };
      },
    }),
    contactUs: builder.mutation({
      query: (requestData) => ({
        url: "notifications/email",
        method: "POST",
        headers: getHeaders(),
        body: requestData,
      }),
    }),
  }),
});

export const {
  useChangeCurrentPasswordRequestMutation,
  useCreateAgentOrBuilderMutation,
  useUpdateAgentOrBuilderMutation,
  useLazyGetAgentOrBuilderQuery,
  useContactUsMutation,
} = changePasswordRequestApi;
// export default changePasswordRequestSlice;
