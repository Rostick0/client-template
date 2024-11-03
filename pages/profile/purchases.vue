<template>
  <div class="profile-purchases">
    <!-- <div class="">{{ data }}</div> -->
    <VFormComponent :field="select" />
    <div class="profile-purchases__charts">
      <template v-if="select.modelValue.id === 'DATE'">
        <div class="profile-purchases__chart" v-if="sumTotals?.length">
          <UiChartStats
            :datasets="[
              {
                backgroundColor: 'rgb(216, 227, 252)',
                borderColor: 'rgb(48, 113, 231)',
                label: 'Покупки',
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
      <template v-if="select.modelValue.id === 'WEEK'">
        <div class="profile-purchases__chart" v-if="sumTotals?.length">
          <UiChartStats
            :datasets="[
              {
                backgroundColor: 'rgb(216, 227, 252)',
                borderColor: 'rgb(48, 113, 231)',
                label: 'Покупки',
                fill: true,
                data: sumTotals,
              },
            ]"
            :labels="weeksLables"
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
            :labels="weeksLables"
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
                label: 'Покупки',
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
    label: "Выборка по периодам",
    options: periods,
  },
});

const days = getDaysPast();
const daysLabels = days.map((item) => item.value);

const weeks = getWeeksPast();
const weeksLables = weeks.map((item) => item.value);

const months = getMonthsPast();
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

  periodDates?.forEach((item) => {
    const period = data.value.find((el) => el?.date == item.id);

    sumTotals.value.push(period?.sum_total ?? 0);
    sumOrderings.value.push(period?.sum_orderings ?? 0);
  });
};
setData(days);

const typeDate = {
  DATE: days,
  WEEK: weeks,
  MONTH: months,
};

watch(
  () => select.value.modelValue,
  debounce(async (cur) => {
    filters.value.period = cur.id;
    await get();

    const typeFinded = typeDate[cur.id];

    if (typeFinded) setData(typeFinded);
  }, 500)
);

// const select = {}

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
