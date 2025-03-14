<template>
  <div>
    <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "~/utils/axiosinstance.js";

// آرایه ماه‌های فارسی
const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد", "تیر",
  "مرداد", "شهریور", "مهر", "آبان",
  "آذر", "دی", "بهمن", "اسفند"
];

// مقادیر اولیه نمودار
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
      gradientToColors: ["#008FFB"],  // رنگ دوم
      inverseColors: false,
      opacity: 1,
      stops: [0, 100]
    },
    opacity: 1,
    colors: "#01E195",
},
  tooltip: { y: { formatter: (val) => val.toLocaleString() } },
});

// دریافت داده‌ها از سرور
const fetchStats = async () => {
  try {
    const response = await axiosInstance.get("/courier/orders/income");

    // ایجاد آرایه پیش‌فرض برای 12 ماه سال
    const stats = Array(12).fill({ total_income: 0 });

    // مقداردهی بر اساس داده‌های دریافتی
    response.data.forEach((item) => {
      const monthIndex = item.jalali_month - 1; // چون آرایه از 0 شروع می‌شود
      stats[monthIndex] = {
        total_income: item.total_income
      };
    });

    // به‌روزرسانی داده‌های نمودار
    chartSeries.value = [
      { name: "درآمد (تومان)", data: stats.map((item) => item.total_income) },
    ];
  } catch (error) {
    console.error("خطا در دریافت آمار: ", error);
  }
};

// اجرا هنگام لود شدن کامپوننت
onMounted(fetchStats);
</script>

<style scoped>
</style>