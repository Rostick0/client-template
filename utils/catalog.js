import startCase from "lodash/startCase";
import api from "~/api";

export const setCatalogUrl = (val, page) =>
  val?.split("/page")[0] + (page > 1 ? `/page-${page}` : "");

export const getNameTypeCatalog = async (type, value) => {
  const types = {
    brand: "brands",
    body: "generations",
    modelcar: "modelCars",
    type: "categories",
  };

  return await api?.[types[type]]
    ?.getAll({
      params: {
        limit: 1,
        "filterEQ[name]": value,
      },
    })
    ?.then((res) => res?.data?.[0]?.name);
};

export const getOneFilterType = async (routeParams) => {
  const whiteListForFetch = ["body", "type", "brand", "modelcar"];
  const whiteList = [...whiteListForFetch, "period"];
  const keys = Object.keys(routeParams);
  const result = {};

  keys?.some((item) => {
    if (!whiteList.find((i) => i === item)) return;

    result.type = item;
    result.value = startCase(routeParams[item]);

    return true;
  });

  if (whiteListForFetch?.find((item) => item === result?.type)) {
    result.value =
      (await getNameTypeCatalog(result?.type, result?.value)) ?? result.value;
  }

  return result;
};
