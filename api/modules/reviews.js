import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/reviews/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/reviews/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/reviews/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/reviews`, params),
  create: async ({ data }) => useFetcher().post(`/reviews`, data),
  getByProductId: async ({ id, params }) =>
    useFetcher().get(`/reviews/product/${id}`, params),
};
