import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/comments/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/comments/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/comments/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/comments`, params),
  create: async ({ data }) => useFetcher().post(`/comments`, data),
};
