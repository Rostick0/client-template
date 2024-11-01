<template>
  <div class="profile-purchases">
    <div class="">{{ data }}</div>
    <VFormComponent :field="select" />
    <div class="profile-purchases__charts">
      <div class="profile-purchases__chart" v-if="sumTotals?.length">
        <UiChartStats
          :datasets="[
            {
              backgroundColor: 'rgb(216, 227, 252)',
              borderColor: 'rgb(48, 113, 231)',
              label: 'View',
              fill: true,
              data: sumTotals,
            },
          ]"
          :labels="labels"
        />
      </div>
      <div class="profile-purchases__chart" v-if="sumOrderings?.length">
        <UiChartStats
          :datasets="[
            {
              backgroundColor: 'rgb(216, 227, 252)',
              borderColor: 'rgb(48, 113, 231)',
              label: 'View',
              fill: true,
              data: sumOrderings,
            },
          ]"
          :labels="labels"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import debounce from "lodash/debounce";

const periods = [
  { id: "DATE", value: "По дням" },
  { id: "WEEK", value: "По неделям" },
  { id: "MONTH", value: "По месяцам" },
];

const select = ref({
  type: "select",
  name: "select",
  modelValue: periods[0],

  bind: {
    options: periods,
  },
});

const lastDaysOfYear = [...new Array(365)].map(
  (i, idx, arr) =>
    moment()
      .startOf("day")
      .subtract(arr.length - 1 - idx, "days")
      // .format("DD")
      .format("YYYY-MM-DD")
  // .format("DD-MM-YYYY")
);

const days = lastDaysOfYear;
const weeks = [];
const months = [...new Array(12)].map((_, i) =>
  new Date(`${i + 1}`).toLocaleDateString("ru", {
    month: "short",
  })
);

const labels = ref(days);

const { filters } = useFilters({
  initialFilters: {
    period: periods[0]?.id,
  },
});

const { data, get } = await useApi({
  name: "userStatistics.orderings",
  filters,
  withCache: true,
});
await get();

const sumTotals = ref([]);
const sumOrderings = ref([]);

const setData = (periodDates) => {
  sumTotals.value = [];
  sumOrderings.value = [];

  periodDates?.forEach((item) => {
    const period = data.value.find((el) => el?.date === item);

    sumTotals.value.push(period?.sum_total ?? 0);
    sumOrderings.value.push(period?.sum_orderings ?? 0);
  });
};
setData(days);

watch(
  () => select.value.modelValue,
  debounce((cur) => {
    filters.value.period = cur.id;
    if (cur.id === "MONTH") {
      labels.value = months;
      setData(months);
    }
    // console.log(filters.value);
  }, 500)
);

definePageMeta({
  layout: "profile",
});
</script>

<style lang="scss" scoped>
.profile-purchases {
  &__charts {
    display: grid;
    // grid-template-columns: repeat(2, 1fr);
  }
}
</style>
