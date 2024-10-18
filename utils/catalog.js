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
    name: String(property?.id),
    type: property?.type,
    modelValue: null,

    bind: {
      label: `${property?.name} ${property?.unit ? `(${property?.unit})` : ""}`,
      maska: "#S.##",
      maskaTokens: "S:[0-9]:multiple",
      // type: "number",
      // dataMaskaReversed: true,
    },
  };

  if (data?.type === "input") {
    data.name += ".0";
  }

  if (data?.type === "select") {
    data.type = "multiple-select";
    data.modelValue = [];
    data.bind["options"] = property?.property_values;
  }

  return data;
};

export const setProperties = (properties) => {
  const data = [];

  for (let i = 0; i < properties?.length; i++) {
    const itemProperty = setPropertyItem(properties[i]);

    if (itemProperty.type === "input") {
      data.push([
        {
          ...itemProperty,
          bind: {
            ...itemProperty.bind,
            placeholder: "От",
          },
        },
        {
          ...itemProperty,
          name: itemProperty.name?.replace("0", "1"),
          bind: {
            ...itemProperty.bind,
            label: null,
            placeholder: "До",
          },
        },
      ]);

      continue;
    }

    data.push(itemProperty);
  }

  return data;
};

export const emptyStringOrJson = (arr) =>
  arr?.length ? JSON.stringify(arr) : "";

export const setPropertyValues = (values) => {
  const data = {
    "filterSomeIN[product_properties]": [],
    "filterSomeEQ[product_properties]": [],
    "filterSomeLEQ[product_properties]": [],
    "filterSomeGEQ[product_properties]": [],
  };

  values?.forEach((item) => {
    if (Array.isArray(item)) {
      if (item[0]?.modelValue) {
        data["filterSomeGEQ[product_properties]"].push({
          column_id: "property_id",
          id: item[0]?.name?.split(".")[0],
          column_value: "value",
          value: +item[0]?.modelValue,
        });
      }

      if (item[1]?.modelValue) {
        data["filterSomeLEQ[product_properties]"].push({
          column_id: "property_id",
          id: item[1]?.name?.split(".")[0],
          column_value: "value",
          value: +item[1]?.modelValue,
        });
      }
      return;
    }

    if (
      (Array.isArray(item?.modelValue) && item?.modelValue?.length < 1) ||
      !item?.modelValue
    )
      return;

    if (item?.type === "multiple-select") {
      data["filterSomeIN[product_properties]"].push({
        column_id: "property_value_id",
        id: item.modelValue?.map?.((item) => item?.id).join(),
      });
      return;
    }

    if (item?.type === "checkbox") {
      data["filterSomeEQ[product_properties]"].push({
        column_id: "property_id",
        id: item?.name,
      });
    }
  });

  return data;
};

export const setOtherValues = (values) => {
  const data = {};

  const addData = (item) => ({
    name: item?.name,
    value: item?.modelValue,
  });

  values?.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((el) => {
        const add = addData(el);
        if (!add.value) return;

        data[add.name] = add.value;
      });
      return;
    }

    const add = addData(el);
    if (!add.value) return;
   
    data[add.name] = add.value;
  });

  return data;
};
