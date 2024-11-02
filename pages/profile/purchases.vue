<template>
  <div class="profile-purchases">
    <div class="">{{ data }}</div>
    <VFormComponent :field="select" />
    <div class="profile-purchases__charts">
      <template v-if="select.modelValue.id === 'DATE'">
        <div class="profile-purchases__chart" v-if="sumTotals?.length">
          <UiChartStats
            :datasets="[
              {
                backgroundColor: 'rgb(216, 227, 252)',
                borderColor: 'rgb(48, 113, 231)',
                label: 'Продажи',
                fill: true,
                data: sumTotals,
              },
            ]"
            :labels="daysLabels"
          />
        </div>
        <div class="profile-purchases__chart" v-if="sumOrderings?.length">
          <UiChartStats
            :datasets="[
              {
                backgroundColor: 'rgb(216, 227, 252)',
                borderColor: 'rgb(48, 113, 231)',
                label: 'Количество заказов',
                fill: true,
                data: sumOrderings,
              },
            ]"
            :labels="daysLabels"
          />
        </div>
      </template>
      <template v-if="select.modelValue.id === 'MONTH'">
        <div class="profile-purchases__chart" v-if="sumTotals?.length">
          <UiChartStats
            :datasets="[
              {
                backgroundColor: 'rgb(216, 227, 252)',
                borderColor: 'rgb(48, 113, 231)',
                label: 'Продажи',
                fill: true,
                data: sumTotals,
              },
            ]"
            :labels="monthsLables"
          />
        </div>
        <div class="profile-purchases__chart" v-if="sumOrderings?.length">
          <UiChartStats
            :datasets="[
              {
                backgroundColor: 'rgb(216, 227, 252)',
                borderColor: 'rgb(48, 113, 231)',
                label: 'Количество заказов',
                fill: true,
                data: sumOrderings,
              },
            ]"
            :labels="monthsLables"
          />
        </div>
      </template>
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

const lastDaysOfYear = [...new Array(365)].map((i, idx, arr) => {
  const curDate = moment()
    .startOf("day")
    .subtract(arr.length - 1 - idx, "days")
    .format("YYYY-MM-DD");

  return {
    id: curDate,
    value: moment(curDate).format("MM.DD.YY"),
  };
});

const days = lastDaysOfYear;
const daysLabels = lastDaysOfYear.map((item) => item.value);

const weeks = [];

const months = [...new Array(12)].map((_, i) => ({
  id: i + 1,
  value: new Date(`${i + 1}`).toLocaleDateString("ru", {
    month: "short",
  }),
}));
const monthsLables = months.map((item) => item.value);

const { filters } = useFilters({
  initialFilters: {
    period: periods[0]?.id,
  },
});

const { data, get } = await useApi({
  name: "userStatistics.orderings",
  unwatchedFilters: filters,
  withCache: true,
});
await get();

const sumTotals = ref([]);
const sumOrderings = ref([]);

const setData = (periodDates) => {
  sumTotals.value = [];
  sumOrderings.value = [];

  console.log(data.value);
  periodDates?.forEach((item) => {
    // console.log(item);
    const period = data.value.find((el) => el?.date == item.id);
    // console.log()
    sumTotals.value.push(period?.sum_total ?? 0);
    sumOrderings.value.push(period?.sum_orderings ?? 0);
  });
};
setData(days);

watch(
  () => select.value.modelValue,
  debounce(async (cur) => {
    filters.value.period = cur.id;
    await get();

    if (cur.id === "DATE") {
      setData(days);
    }

    if (cur.id === "MONTH") {
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
