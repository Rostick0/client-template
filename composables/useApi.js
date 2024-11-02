// import type { typeApi, apiMethods } from "~/api";
import api from "~/api";
import uniqueId from "lodash/uniqueId";
// import type { initialFiltersItem } from "./useFilter";
// const name = {
// login: () => {},
// };

// interface iUseApi {
//   // name: `${keyof typeof users}`;
//   // ${keyof typeApi}.
//   apiName: keyof typeApi;
//   apiMethod: "get" | "getAll";
//   params?: object;
//   filters?: globalThis.Ref<initialFiltersItem>;
//   //   unwatchedFilters = {},
//   requestParams?: any;
//   //   callback = null,
//   init?: boolean;
//   afterCallback?: Function;
//   headers?: HeadersInit;
//   //   initialValue = null,
//   afterInit?: Function;
//   popup?: boolean;
//   withCache?: boolean;
//   cacheDataLimit?: number;
// }

export default async ({
  name,
  params = {},
  filters,
  unwatchedFilters = {},
  requestParams = {},
  //   callback = null,
  init = false,
  afterCallback = () => {},
  headers = {},
  //   initialValue = null,
  afterInit = () => {},
  popup = true,
  withCache = false,
  cacheDataLimit = 20,
}) => {
  const id = uniqueId();
  const data = useState(`data-${id}`, () => null);
  const isLoading = useState(`loading-${id}`, () => null);
  const error = useState(`error-${id}`, () => false);
  const meta = useState(`meta-${id}`, () => []);
  const cache = useState(`cache-${id}`, () => []);
  const [apiName, apiMethod] = name?.split(".") ?? [null, null];

  const get = async (rParams = {}, filter = {}) => {
    try {
      const preParams = {
        ...requestParams,
        ...rParams,
        params: {
          ...params,
          ...unwatchedFilters.value,
          ...filters?.value,
          ...filter,
          // signal: signal.value,
        },
      };
      if (headers) {
        preParams.headers = headers;
      }

      if (withCache) {
        const cacheValue = cache.value.find(
          (item) => item.params === JSON.stringify(preParams)
        );
        // console.log(cacheValue)

        if (cacheValue) {
          data.value = cacheValue.data;
          meta.value = cacheValue.meta;
          return;
        }
      }

      if (isLoading.value === false) return;
      isLoading.value = false;

      await api?.[apiName]?.[apiMethod]?.(preParams, headers)?.then(
        async (res) => {
          const { data: dataLocal, ...other } = res;

          data.value = dataLocal ?? res;
          meta.value = other;

          if (withCache && other) {
            cache.value = [
              ...cache.value,
              {
                params: JSON.stringify(preParams),
                data: dataLocal,
                meta: other,
              },
            ];
          }
        }
      );

      isLoading.value = true;
    } catch (e) {
      console.error(e);
      isLoading.value = false;
    }
  };

  if (withCache) {
    watch(
      () => cache.value.length,
      (nV) => {
        if (nV > cacheDataLimit) {
          cache.value = cache.value.slice(nV - cacheDataLimit);
        }
      }
    );
  }

  onMounted(() => {
    if (isReactive(filters?.value)) {
      watch(
        [() => filters?.value],
        async () => {
          await get({}, { ...params, ...filters?.value });
        },
        { deep: true }
      );
    }
  });

  if (init) {
    onMounted(async () => {
      await get({}, { ...params, ...filters?.value });
    });
  }

  return {
    data,
    isLoading,
    error,
    meta,
    get,
  };
};

// export default useApi;
