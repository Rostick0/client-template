export default ({ init = false } = {}) => {
  const cartProductIds = useState("cartProductIds", () => [1, 2, 3]);

  const productIsExists = (productId) =>
    cartProductIds.value.find((item) => item === productId);

  const productAdd = (productId) => {
    if (productIsExists(productId)) return;

    cartProductIds.value = [...cartProductIds.value, productId];
  };

  const productDelete = (productId) => {
    const findedId = productIsExists(productId);
    if (findedId) {
      const ids = [...cartProductIds.value];
      ids.splice(
        cartProductIds.value.findIndex((item) => item === findedId),
        1
      );
      cartProductIds.value = ids;
    }
  };

  if (init) {
    const cookieCartProductIds = useCookie("cartProductIds", {
      maxAge: 60 * 60 * 24 * 30,
    });

    watch(
      () => cartProductIds.value,
      (cur) => (cookieCartProductIds.value = JSON.stringify(cur))
    );

    return {
      cartProductIds,
      cookieCartProductIds,
      productIsExists,
      productAdd,
      productDelete,
    };
  }

  return {
    cartProductIds,
    productIsExists,
    productAdd,
    productDelete,
  };
};
