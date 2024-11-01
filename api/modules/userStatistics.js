import useFetcher from "../../utils/fetch";

export default {
  // get: async ({ id, params }) => useFetcher().get(`/user-statistics/${id}`, params),
  // delete: async ({ id, params }) =>
  //   useFetcher().delete(`/user-statistics/${id}`, params),
  // update: async ({ id, data, params }) =>
  //   useFetcher().patch(`/user-statistics/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/user-statistics`, params),
  orderings: async ({ params }) =>
    useFetcher().get(`/user-statistics/orderings`, params),
  // create: async ({ data }) => useFetcher().post(`/user-statistics`, data),
};
