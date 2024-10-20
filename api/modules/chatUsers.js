import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/chat-users/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/chat-users/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/chat-users/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/chat-users`, params),
};
