import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders } from "../configuration/headers";
// import { getHeaders } from "../headers";

export const userApi = createApi({
  reducerPath: "userApi", // Reflects a more generic name for user-related operations
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginRequest: builder.mutation({
      query: (userDetails) => {
        return {
          url: "/login",
          method: "POST",
          body: userDetails,
        };
      },
      invalidatesTags: ["User"],
    }),
    authorize: builder.mutation({
      query: (requestData) => ({
        url: "/oautherize",
        method: "POST",
        body: requestData,
      }),
    }),
    createUser: builder.mutation({
      query: (requestData) => {
        return {
          url: "/register",
          method: "POST",
          body: requestData,
        };
      },
      invalidatesTags: ["User"],
    }),
    verifyOTP: builder.mutation({
      query: (requestData) => {
        return {
          url: "/verifyotp",
          method: "POST",
          body: requestData,
          headers: getHeaders(),
        };
      },
      invalidatesTags: ["User"],
    }),
    verifyMobileOtp: builder.mutation({
      query: (requestData) => {
        return {
          url: "/verifyMobileOtp",
          method: "POST",
          body: requestData,
        };
      },
      invalidatesTags: ["User"],
    }),
    verifyEmailOtp: builder.mutation({
      query: (requestData) => {
        console.log("requestData", requestData);
        return {
          url: "/verifyEmailOtp",
          method: "POST",
          body: requestData,
        };
      },
      invalidatesTags: ["User"],
    }),
    sendOtpToEmailOrPhone: builder.mutation({
      query: (details) => {
        return {
          url: "/sendOtp",
          method: "POST",
          body: details,
        };
      },
      // invalidateTags: ["sendOtpToEmailOrPhone"],
    }),
    sendOtpToEmail: builder.mutation({
      query: (details) => {
        return {
          url: "/sendOtpToEmail",
          method: "POST",
          body: details,
        };
      },
      // invalidateTags: ["sendOtpToEmailOrPhone"],
    }),
    updateUser: builder.mutation({
      query: (params = {}) => {
        const { id, ...body } = params;
        const headers = getHeaders(); // Get headers

        console.log("temp456", id, body);
        console.log("Headers:", headers); // ✅ Log headers

        return {
          url: `/user/${id}`,
          method: "PUT",
          body,
          headers, // ✅ Use headers
        };
      },
    }),
    userPhoneVerification: builder.mutation({
      query: (requestData) => ({
        url: `/change/number`,
        method: "POST",
        body: requestData,
        headers: getHeaders(),
      }),
      invalidatesTags: ["UserRequest"],
    }),
    validateUser: builder.mutation({
      query: (requestData) => ({
        url: "/searchuser",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["UserRequest"],
    }),
    getUserData: builder.query({
      query: (userId) => {
        return {
          url: `/user/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["UserRequest"], // Specify tags for caching
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    forgotPasswordRequest: builder.mutation({
      query: (details) => ({
        url: "/forgotpassword",
        method: "POST",
        body: details,
      }),
      // invalidateTags: ["ResendOtpRequest"],
    }),

    resendOtp: builder.mutation({
      query: (details) => ({
        url: "/resendotp",
        method: "POST",
        body: details,
      }),
      // invalidateTags: ["ResendOtpRequest"],
    }),
    changePasswordRequest: builder.mutation({
      query: (details) => ({
        url: "/changepassword",
        method: "POST",
        body: details,
      }),
    }),
    setNewPasswordRequest: builder.mutation({
      query: (details) => ({
        url: "/passwordSetup",
        method: "POST",
        body: details,
      }),
    }),
    getBuilderDetails: builder.query({
      query: (userId) => {
        console.log("prams111", userId);
        return {
          url: `/builder/user/${userId}`,
          method: "GET",
          headers: getHeaders(),
        };
      },
      providesTags: ["UserRequest"], // Specify tags for caching
    }),
    getBuilderResponses: builder.query({
      query: (params = {}) => {
        let { limit, offset, builderId, userId } = params;
        const queryParams = [
          limit && `limit=${limit}`,
          offset && `offset=${offset}`,
          builderId && `builderId=${builderId}`,
          userId && `userId=${userId}`,
        ]
          .filter(Boolean)
          .join("&");
        console.log("queryParams", queryParams);
        return {
          url: `/builderResponses/?${queryParams}`,
          method: "GET",
          headers: {
            ...getHeaders(),
          },
        };
      },
      providesTags: ["UserRequest"],
    }),
    getBuilderDetailsByBuilderId: builder.query({
      query: (builderId) => {
        console.log("prams111", builderId);
        return {
          url: `/builder/${builderId}`,
          method: "GET",
          headers: getHeaders(),
        };
      },
      providesTags: ["UserRequest"], // Specify tags for caching
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyOTPMutation,
  useVerifyMobileOtpMutation,
  useUpdateUserMutation,
  useLazyGetUsersQuery,
  useLazyGetUserDataQuery,
  useLoginRequestMutation,
  useForgotPasswordRequestMutation,
  useChangePasswordRequestMutation,
  useSendOtpToEmailOrPhoneMutation,
  useUserPhoneVerificationMutation,
  useValidateUserMutation,
  useSendOtpToEmailMutation,
  useVerifyEmailOtpMutation,
  useSetNewPasswordRequestMutation,
  useLazyGetBuilderDetailsQuery,
  useLazyGetBuilderDetailsByBuilderIdQuery,
  useResendOtpMutation,
  useAuthorizeMutation,
  useLazyGetBuilderResponsesQuery,
  useGetBuilderDetailsByBuilderIdQuery,
} = userApi;
