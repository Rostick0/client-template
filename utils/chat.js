export const getInterlocutor = (chatUsers, currentUser) =>
  chatUsers?.find((item) => item?.user_id !== currentUser?.id)?.user;
