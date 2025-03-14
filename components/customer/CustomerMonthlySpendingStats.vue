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
    try {
      const response = await axiosInstance.get("/customer/orders/spending-stats");
      const data = response.data;
      
      chartSeries.value[0].data = persianMonths.map((month, index) => {
      const monthData = data.find(item => item.month === index + 1);
      return {
        x: month, 
        y: monthData ? (monthData.total_spent === 0 ? 9000 : monthData.total_spent) : 0
      };
    });
    } catch (error) {
      console.error("خطا در دریافت داده‌های پرداختی:", error);
    }
};
  
onMounted(fetchSpendingData);
</script>
  
<style scoped>
</style>