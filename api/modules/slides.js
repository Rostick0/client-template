import useFetcher from "../../utils/fetch";

export default {
  getAll: async ({ params = {} } = {}) => useFetcher().get(`/slides`, params),
};
