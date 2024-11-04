import useFetcher from "../../utils/fetch";

export default {
  updateEmail: async ({ data }) =>
    useFetcher().patch(`/users/email-update`, data),
};
