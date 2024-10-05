export default ({ init = false } = {}) => {
  const cartProduct = useState("cartProduct", () => [
    { id: 1, localCount: 1 },
    { id: 2, localCount: 4 },
    { id: 3, localCount: 3 },
  ]);

  const productIsExists = (productId) =>
    cartProduct.value.find((item) => item?.id === productId);

  const productAdd = ({ productId, localCount }) => {
    if (productIsExists(productId)) return;

    cartProduct.value = [...cartProduct.value, { id: productId, localCount }];
  };

  const productDelete = (productId) => {
    const findedId = productIsExists(productId);
    if (!findedId) return;

    const products = [...cartProduct.value];
    products.splice(
      cartProduct.value.findIndex((item) => item?.id === findedId),
      1
    );
    cartProduct.value = products;
  };

  if (init) {
    const cookieCartProduct = useCookie("cartProduct", {
      maxAge: 60 * 60 * 24 * 30,
    });

    watch(
      () => cartProduct.value,
      (cur) => (cookieCartProduct.value = JSON.stringify(cur))
    );

    return {
      cartProduct,
      cookieCartProduct,
      productIsExists,
      productAdd,
      productDelete,
    };
  }

  return {
    cartProduct,
    productIsExists,
    productAdd,
    productDelete,
  };
};
