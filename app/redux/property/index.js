import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeaders } from "../configuration/headers";

export const propertyApi = createApi({
  reducerPath: "propertyApi", // Reflects a more generic name for user-related operations
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getHeaders().Authorization;
      headers.set("Authorization", `${token}`);
      return headers;
    },
  }),
  tagTypes: ["Property"],
  endpoints: (builder) => ({
    propertyCreation: builder.mutation({
      query: (propertyDetails) => {
        return {
          url: "/property",
          method: "POST",
          body: propertyDetails,
          headers: getHeaders(),
        };
      },
      invalidatesTags: ["Property"],
    }),
    updateProperty: builder.mutation({
      query: (params = {}) => {
        const { id, ...body } = params;
        return {
          url: `/property/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    updatePropertyFavorite: builder.mutation({
      query: (params = {}) => {
        const { ...body } = params;
        return {
          url: `/property/request/favourite`,
          method: "post",
          body,
          headers: getHeaders(),
        };
      },
    }),
    getPropertyData: builder.query({
      query: (propertyId) => {
        return {
          url: `/property/${propertyId}`,
          method: "GET",
        };
      },
      providesTags: ["PropertyRequest"], // Specify tags for caching
    }),
    getProperties: builder.query({
      query: (params = {}) => {
        let {
          limit,
          offset,
          isFavorite,
          myFavorites,
          myFavorite,
          sourceOfCreation,
          status,
          sortOrder,
          userId,
          propertyType,
          createdByRole,
          bhkType,
          propertyStatus,
          ageOfProperty,
          city,
          sortBy,
          builderId,
          keyword,
          minPrice,
          maxPrice,
          amenities,
        } = params;
        const queryParams = [
          limit && `limit=${limit}`,
          offset && `offset=${offset}`,
          userId && `userId=${userId}`,
          builderId && `builderId=${builderId}`,
          sourceOfCreation && `sourceOfCreation=${sourceOfCreation}`,
          status && `status=${status}`,
          sortOrder && `sortOrder=${sortOrder}`,
          sortBy && `sortBy=${sortBy}`,
          isFavorite && `isFavorite=${isFavorite}`,
          myFavorite && `myFavorite=${myFavorite}`,
          myFavorites && `myFavorites=${myFavorites}`,
          propertyType && `propertyType=${propertyType}`,
          createdByRole && `createdByRole=${createdByRole}`,
          bhkType && `bhkType=${bhkType}`,
          propertyStatus && `propertyStatus=${propertyStatus}`,
          ageOfProperty && `ageOfProperty=${ageOfProperty}`,
          city && `city=${city}`,
          keyword && `keyword=${keyword}`,
          minPrice && `minPrice=${minPrice}`,
          maxPrice && `maxPrice=${maxPrice}`,
          amenities && `amenities=${amenities}`,
        ]
          .filter(Boolean)
          .join("&");
        console.log("donationParams");
        return {
          url: `/property/?${queryParams}`,
          method: "GET",
          headers: {
            ...getHeaders(), // Use the getHeaders function to get your headers
            // Add any other headers you want here
          },
        };
      },
      providesTags: ["Property"],
    }),
    getReportedPropertiesList: builder.query({
      query: (params = {}) => {
        let {
          limit,
          offset,
          status,
          sortOrder,
          propertyStatus,
          sortBy,
          keyword,
          type,
        } = params;
        const queryParams = [
          limit && `limit=${limit}`,
          offset && `offset=${offset}`,
          status && `status=${status}`,
          sortOrder && `sortOrder=${sortOrder}`,
          sortBy && `sortBy=${sortBy}`,
          propertyStatus && `propertyStatus=${propertyStatus}`,
          keyword && `keyword=${keyword}`,
          type && `type=${type}`,
        ]
          .filter(Boolean)
          .join("&");
        console.log("donationParams");
        return {
          url: `/spam?${queryParams}`,
          method: "GET",
          headers: {
            ...getHeaders(), // Use the getHeaders function to get your headers
            // Add any other headers you want here
          },
        };
      },
      providesTags: ["Property"],
    }),
    createContactProperty: builder.mutation({
      query: ({ ...body }) => {
        return {
          url: `/propertyResponses`,
          method: "POST",
          body,
          headers: getHeaders(),
        };
      },
      invalidatesTags: ["Property"],
    }),
    updateContactProperty: builder.mutation({
      query: (params = {}) => {
        const { id, ...body } = params;
        return {
          url: `/propertyResponses/${id}`,
          method: "PUT",
          body,
          headers: getHeaders(),
        };
      },
      invalidatesTags: ["Property"],
    }),
    createContactBuilder: builder.mutation({
      query: ({ ...body }) => {
        return {
          url: `/builderResponses`,
          method: "POST",
          body,
          headers: getHeaders(),
        };
      },
      invalidatesTags: ["Property"],
    }),
    updateContactBuilder: builder.mutation({
      query: (params = {}) => {
        const { id, ...body } = params;
        return {
          url: `/builderResponses/${id}`,
          method: "PUT",
          body,
          headers: getHeaders(),
        };
      },
      invalidatesTags: ["Property"],
    }),
    getPropertyResponses: builder.query({
      query: (params = {}) => {
        let {
          limit,
          offset,
          propertyId,
          status,
          sortOrder,
          userId,
          isFavorite,
        } = params;
        const queryParams = [
          limit && `limit=${limit}`,
          offset && `offset=${offset}`,
          propertyId && `propertyId=${propertyId}`,
          userId && `userId=${userId}`,
          status && `status=${status}`,
          sortOrder && `sortOrder=${sortOrder}`,
          isFavorite && `isFavorite=${isFavorite}`,
        ]
          .filter(Boolean)
          .join("&");
        console.log("donationParams");
        return {
          url: `/propertyResponses/?${queryParams}`,
          method: "GET",
          headers: {
            ...getHeaders(), // Use the getHeaders function to get your headers
            // Add any other headers you want here
          },
        };
      },
      providesTags: ["Property"],
    }),

    contactPropertySeller: builder.mutation({
      query: ({ propertyId, ...body }) => {
        return {
          url: `/property/${propertyId}/contactSeller`,
          method: "POST",
          body,
          headers: getHeaders(),
        };
      },
      invalidatesTags: ["Property"],
    }),
    getCities: builder.query({
      query: (params = {}) => {
        const { limit = 10, keyword, country } = params;

        const queryParams = [
          limit && `limit=${limit}`,
          keyword && `keyword=${keyword}`,
          country && `country=${country}`,
        ]
          .filter(Boolean)
          .join("&");
        console.log("paramsCities", params);

        return {
          url: `/cities/?${queryParams}`,
          method: "GET",
        };
      },
    }),
    getPropertyAmenities: builder.query({
      query: () => ({
        url: `/property/amenities`,
        method: "GET",
      }),
      invalidatesTags: ["Property"],
    }),
    deleteProperty: builder.mutation({
      query: (params = {}) => {
        const { id, ...body } = params;
        console.log("temp456", id);

        return {
          url: `/property/${id}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Property"],
    }),
    spamAProperty: builder.mutation({
      query: ({ propertyId, ...body }) => {
        return {
          url: `/spam`,
          method: "POST",
          body,
          headers: getHeaders(),
        };
      },
      invalidatesTags: ["Property"],
    }),
  }),
});

export const {
  usePropertyCreationMutation,
  useUpdatePropertyMutation,
  useLazyGetPropertyDataQuery,
  useLazyGetReportedPropertiesListQuery,
  useLazyGetCitiesQuery,
  useLazyGetPropertiesQuery,
  useLazyGetPropertyResponsesQuery,
  useContactPropertySellerMutation,
  useUpdatePropertyFavoriteMutation,
  useCreateContactPropertyMutation,
  useCreateContactBuilderMutation,
  useLazyGetPropertyAmenitiesQuery,
  useDeletePropertyMutation,
  useSpamAPropertyMutation,
  useUpdateContactPropertyMutation,
  useUpdateContactBuilderMutation,
} = propertyApi;
export default propertyApi;
