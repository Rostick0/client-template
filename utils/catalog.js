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

const setPropertyItem = (property) => {
  const data = {
    name: property?.name,
    type: property?.type,
    modelValue: null,

    bind: {
      label: property?.name,
      label: `${property?.name} ${property?.unit ? `(${property?.unit})` : ""}`,
    },
  };

  if (data?.type === "select") {
    data.type = "multiple-select";
    data.modelValue = [];
    data.bind["options"] = property?.property_values;
  }

  return data;
};

export const setProperties = (properties) => properties?.map(setPropertyItem);

export const emptyStringOrJson = (arr) =>
  arr?.length ? JSON.stringify(arr) : "";

export const setPropertyValues = (values) => {
  const selects = [];
  const inputs = [];
  const checkboxes = [];

  values?.forEach((item) => {
    if (
      (Array.isArray(item?.modelValue) && item?.modelValue?.length < 1) ||
      !item?.modelValue
    )
      return;
    if (item?.type === "multiple-select") {
      return selects.push(item);
    }

    if (item?.type === "input") {
      return inputs.push(item);
    }

    if (item?.type === "checkbox") {
      return checkboxes.push(item);
    }
  });

  console.log(selects);

  return {
    "filterSomeIN[product_properties]": emptyStringOrJson(
      selects.map((item) => ({
        column_id: "property_value_id",
        id: item.modelValue?.map?.((item) => item?.id).join(),
        column_value: "value",
        value: null,
      }))
    ),
  };
};
