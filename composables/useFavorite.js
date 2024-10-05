export default () => {
  const favoriteProductIds = useState("favoriteProductIds", () => []);
  const cookieFavoriteProductIds = useCookie("favoriteProductIds", {
    maxAge: 60 * 60 * 24 * 30,
  });

  const productIsExists = (productId) =>
    favoriteProductIds.value.find((item) => item === productId);

  const productToggle = (productId) => {
    const findedId = productIsExists(productId);

    if (findedId) {
      const ids = [...favoriteProductIds.value];
      ids.splice(
        favoriteProductIds.value.findIndex((item) => item === findedId),
        1
      );
      favoriteProductIds.value = ids;
      return;
    }

    favoriteProductIds.value = [...favoriteProductIds.value, productId];
  };

  watch(
    () => favoriteProductIds.value,
    (cur) => (cookieFavoriteProductIds.value = JSON.stringify(cur))
  );

  return {
    favoriteProductIds,
    cookieFavoriteProductIds,
    productIsExists,
    productToggle,
  };
};
