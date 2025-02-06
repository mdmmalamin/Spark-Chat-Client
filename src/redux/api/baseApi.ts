/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: import.meta.env.VITE_PUBLIC_BASE_API,
  baseUrl: import.meta.env.VITE_LOCAL_BASE_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);

  // result?.error?.status === 404 && toast.error(result?.error?.data?.message);

  // result?.error?.status === 403 && toast.error(result?.error?.data?.message);

  if (result?.error?.status === 401) {
    //* Send Refresh Token
    console.log("Sending refresh token");
    const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(setUser({ user, data: data.data.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: baseQuery,
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["ALL_USERS", "ALL_CHATS"],
  endpoints: () => ({}),
});
