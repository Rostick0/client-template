<template>
  <div class="profile">
    <h2 class="h2">Статистика</h2>
    <ProfileStatistics :data="data" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

const user = useState("user");

const { data } = await useApi({
  name: "userStatistics.getAll",
  init: true,
});
</script>

<style lang="scss" scoped>
.profile {
}
</style>

<!-- 
<template>
  <Layout class="admin-dashboard">
    <div class="admin-dashboard__title">Products data</div>
    <div class="admin-dashboard__charts">
      <div class="admin-dashboard__chart">
        <UiChartStats
          :datasets="[
            {
              backgroundColor: 'rgb(222, 241, 222)',
              borderColor: 'rgb(20, 196, 77)',
              label: 'Sale',
              data: chartData.product.saleProductData,
            },
          ]"
          :labels="labels"
        />
      </div>
      <div class="admin-dashboard__chart">
        <UiChartStats
          :datasets="[
            {
              backgroundColor: 'rgb(252, 212, 213)',
              borderColor: 'rgb(218, 0, 56)',
              label: 'Refund',
              data: chartData.product.refundProductData,
            },
          ]"
          :labels="labels"
        />
      </div>
      <div class="admin-dashboard__chart">
        <UiChartStats
          :datasets="[
            {
              backgroundColor: 'rgb(216, 227, 252)',
              borderColor: 'rgb(48, 113, 231)',
              label: 'View',
              fill: true,
              data: chartData.product.viewProductData,
            },
          ]"
          :labels="labels"
        />
      </div>
    </div>
    <div class="admin-dashboard__title">Posts data</div>
    <div class="admin-dashboard__charts">
      <div class="admin-dashboard__chart">
        <UiChartStats
          :datasets="[
            {
              backgroundColor: 'rgb(222, 241, 222)',
              borderColor: 'rgb(20, 196, 77)',
              label: 'Sale',
              data: chartData.post.viewPostData,
            },
          ]"
          :labels="labels"
        />
      </div>
    </div>
  </Layout>
</template>

<script setup>
import moment from "moment";

const { data: productData, get: getProductData } = await useApi({
  name: "statisticDays.getAll",
  params: {
    "filterEQ[stat_relatsable_type]": "App\\Models\\Product",
  },
});
await getProductData();

const { data: postData, get: getPostData } = await useApi({
  name: "statisticDays.getAll",
  params: {
    "filterEQ[stat_relatsable_type]": "App\\Models\\Post",
  },
});
await getPostData();

const lastThirtyDays = ref(
  [...new Array(30)].map(
    (i, idx, arr) =>
      moment()
        .startOf("day")
        .subtract(arr.length - 1 - idx, "days")
        // .format("DD")
        .format("YYYY-MM-DD")
    // .format("DD-MM-YYYY")
  )
);

const labels = computed(() =>
  lastThirtyDays.value.map((item) => item.split("-")[2])
);

const chartData = computed(() => {
  const saleProductData = [];
  const refundProductData = [];
  const viewProductData = [];

  const viewPostData = [];

  const defaultView = {
    sale: 0,
    refund: 0,
    view: 0,
  };

  lastThirtyDays.value.forEach((item, i) => {
    const product =
      productData.value?.find?.((el) => el?.date === item) ?? defaultView;

    const post =
      postData.value?.find?.((el) => el?.date === item) ?? defaultView;

    saleProductData.push(product?.sale);
    refundProductData.push(product?.refund);
    viewProductData.push(product?.view);

    viewPostData.push(post?.view);
  });

  return {
    product: { saleProductData, refundProductData, viewProductData },
    post: { viewPostData },
  };
});
</script>

<style lang="scss" scoped>
.admin-dashboard {
  &__title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  &__charts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__chart {
    background-color: rgb(var(--color-white));
    border-radius: 0.33rem;
    padding: 0.5rem;
  }
}
</style> -->
