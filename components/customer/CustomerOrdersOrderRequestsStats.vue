<template>
    <div>
      <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axiosInstance from "~/utils/axiosinstance.js";
  
  // تبدیل شماره ماه به نام فارسی
  const persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  
  const chartOptions = ref({
    chart: {
      type: "bar",
      fontFamily: "Yekan Bakh FaNum",
      toolbar: { show: false },
    },
    xaxis: {
      categories: persianMonths, // اسم ماه‌ها به‌جای اعداد
      title: { text: "ماه‌های سال" }
    },
    yaxis: {
      title: { text: "تعداد" }
    },
    title: {
      text: "تعداد درخواست‌ها و سفارشات سال جاری",
      align: "center"
    },
    colors: ['#FEB019', '#2ecc71', '#3498db'],
    plotOptions: {
        bar: {
            borderRadius: 8,
            borderRadiusApplication: 'end'
        },
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
    },
});
  
  const chartSeries = ref([
    { name: "سفارشات لغو شده", data: [] },
    { name: "سفارشات تحویل داده شده", data: [] },
    { name: "درخواست‌ها", data: [] },
  ]);
  
  const fetchOrdersData = async () => {
    try {
      const response = await axiosInstance.get("/customer/orders/stats");
      const data = response.data;
  
      const requests = Array(12).fill(0);
      const delivered = Array(12).fill(0);
      const canceled = Array(12).fill(0);
  
      data.forEach((item) => {
        const index = item.month - 1; // چون آرایه از ۰ شروع میشه
        requests[index] = item.requests;
        delivered[index] = item.delivered;
        canceled[index] = item.canceled;
      });
  
      chartSeries.value[2].data = requests;
      chartSeries.value[1].data = delivered;
      chartSeries.value[0].data = canceled;
    } catch (error) {
      console.error("خطا در دریافت داده‌ها:", error);
    }
  };
  
  onMounted(fetchOrdersData);
  </script>
  
  <style scoped></style>  