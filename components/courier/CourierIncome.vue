<template>
  <div>
    <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "~/utils/axiosinstance.js";

const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد", "تیر",
  "مرداد", "شهریور", "مهر", "آبان",
  "آذر", "دی", "بهمن", "اسفند"
];

const chartSeries = ref([]);
const chartOptions = ref({
  chart: { type: "bar", height: 350, fontFamily: "Yekan Bakh FaNum" },
  title: {
    text: "آمار درآمد سالانه", align: "center",
  },
  plotOptions: { bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" } },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ["transparent"] },
  xaxis: { categories: persianMonths,
    labels: {
      style: {
        fontFamily: "Yekan Bakh FaNum",
      },
    }, },
  yaxis: { title: { text: "درآمد (تومان)" } },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: ["#008FFB"], 
      inverseColors: false,
      opacity: 1,
      stops: [0, 100]
    },
    opacity: 1,
    colors: "#01E195",
},
  tooltip: { y: { formatter: (val) => val.toLocaleString() } },
});

const fetchStats = async () => {
  try {
    const response = await axiosInstance.get("/courier/orders/income");

    const stats = Array(12).fill({ total_income: 0 });

    response.data.forEach((item) => {
      const monthIndex = item.jalali_month - 1;
      stats[monthIndex] = {
        total_income: item.total_income
      };
    });

    // chartSeries.value = [
    //   { name: "درآمد (تومان)", data: stats.map((item) => item.total_income) },
    // ];

    //-----------------------------------
    // fake data
    const fakeIncomeData = [
      320000, 470000, 690000, 540000,
      880000, 750000, 630000, 410000,
      570000, 340000, 290000, 610000
    ]
    chartSeries.value = [
      { name: "درآمد (تومان)", data: fakeIncomeData }
    ]
    //-----------------------------------
  } catch (error) {
    console.error("خطا در دریافت آمار: ", error);
  }
};

onMounted(fetchStats);
</script>

<style scoped>
</style>