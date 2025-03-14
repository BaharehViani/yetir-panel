<template>
    <div>
      <div class="flex justify-center">
        <apexchart 
          type="pie" 
          height="365" 
          width="373"
          :options="chartOptions" 
          :series="chartSeries" 
        />
      </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import axiosInstance from '~/utils/axiosinstance.js';
  
const chartSeries = ref([]);
const totalDeliveredOrders = ref();
  
const chartOptions = ref({
    chart: {
      type: 'pie',
      fontFamily: "Yekan Bakh FaNum",
    },
    title: {
      text: "آمار سفارشات ارسال شده",  
      align: "center",
    },
    labels: ['پاکت', 'جعبه کوچک', 'جعبه متوسط', 'جعبه بزرگ'], 
    colors: ['#FF5733', '#33FF57', '#5733FF', '#FF33A1'], 
    legend: {
      position: 'bottom',
      fontSize: '14px',
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString()}%`, 
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`
    }
});
  
const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/customer/orders/types'); 
  
      totalDeliveredOrders.value = response.data.total_sent_orders;
  
      chartSeries.value = [
        response.data.packages.pocket,     
        response.data.packages.smallBox,   
        response.data.packages.mediumBox,  
        response.data.packages.largeBox,   
      ];

      chartOptions.value = Object.assign({}, chartOptions.value, {
        subtitle: {
          text: `تعداد کل سفارشات: ${totalDeliveredOrders.value}`,
          align: "center",
          style: {
            fontSize: "14px",
            fontWeight: "normal",
            color: "#333"
          }
        }
      });
    } catch (error) {
      console.error('خطا در دریافت آمار:', error);
    }
};

onMounted(fetchStats);
</script>
  
<style scoped>
</style>
  