import { baseApi } from "../../api/baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.query({
      query: () => {
        return {
          url: "/chats/get-all-chats",
          method: "GET",
        };
      },
      providesTags: ["ALL_CHATS"],
    }),
  }),
});

export const { useGetAllChatsQuery } = chatApi;
