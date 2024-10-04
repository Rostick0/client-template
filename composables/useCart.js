export default () => {
  const productIds = useState("cartProductsIds", () => []);
  const cookieProductIds = useCookie("cartProductIds", {
    maxAge: 60 * 60 * 24 * 30,
  });

  const productIsExists = (productId) =>
    productIds.value.find((item) => item === productId);

  const productAdd = (productId) => {
    if (productIsExists(productId)) return;

    productIds.value = [...productIds.value, productId];
  };

  const productDelete = (productId) => {
    const findedId = productIsExists(productId);
    if (findedId) {
      const ids = [...productIds.value];
      ids.splice(
        productIds.value.findIndex((item) => item === findedId),
        1
      );
      productIds.value = ids;
    }
  };

  watch(
    () => productIds.value,
    (cur) => (cookieProductIds.value = JSON.stringify(cur))
  );

  return {
    productIds,
    cookieProductIds,
    productIsExists,
    productAdd,
    productDelete,
  };
};
