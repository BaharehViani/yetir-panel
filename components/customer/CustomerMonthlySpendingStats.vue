<template>
    <div>
      <apexchart type="treemap" height="350" :options="chartOptions" :series="chartSeries" />
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "~/utils/axiosinstance.js";
  
const persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];
  
const chartOptions = ref({
    chart: {
      type: "treemap",
      fontFamily: "Yekan Bakh FaNum",
      toolbar: { show: false },
    },
    title: {
      text: "هزینه‌ پرداخت شده در هر ماه",
      align: "center"
    },
    colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0'],
    legend: {
      show: false
    },
    plotOptions: {
      treemap: {
        enableShades: true,
        distributed: true
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString()}`, 
      }
    },
});
  
const chartSeries = ref([{ data: [] }]);
  
const fetchSpendingData = async () => {
  chartSeries.value[0].data = [
    { x: "فروردین", y: 235000 },
    { x: "اردیبهشت", y: 89000 },
    { x: "خرداد", y: 134000 },
    { x: "تیر", y: 162000 },
    { x: "مرداد", y: 143000 },
    { x: "شهریور", y: 118000 },
    { x: "مهر", y: 121000 },
    { x: "آبان", y: 178000 },
    { x: "آذر", y: 77000 },
    { x: "دی", y: 294000 },
    { x: "بهمن", y: 120000 },
    { x: "اسفند", y: 367000 },
  ];

    // try {
    //   const response = await axiosInstance.get("/customer/orders/spending-stats");
    //   const data = response.data;
      
    //   chartSeries.value[0].data = persianMonths.map((month, index) => {
    //   const monthData = data.find(item => item.month === index + 1);
    //   return {
    //     x: month, 
    //     y: monthData ? (monthData.total_spent === 0 ? 9000 : monthData.total_spent) : 0
    //   };
    // });
    // } catch (error) {
    //   console.error("خطا در دریافت داده‌های پرداختی:", error);
    // }
};
  
onMounted(fetchSpendingData);
</script>
  
<style scoped>
</style>