<template>
    <div>
      <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axiosInstance from '~/utils/axiosinstance.js'
  import jalaali from 'jalaali-js'
  
  const chartOptions = ref({
    chart: {
      id: 'basic-line',
      toolbar: { show: false },
      fontFamily: "Yekan Bakh FaNum",
    },
    xaxis: {
      categories: [],
      title: { text: 'روز های ماه' }
    },
    yaxis: {
      title: { text: 'تعداد سفارشات' }
    },
    stroke: { curve: 'smooth' },
    title: {
      text: 'تعداد سفارشات روزانه در ماه جاری',
      align: 'center'
    }
  })
  
  const chartSeries = ref([
    {
      name: 'سفارشات',
      data: []
    }
  ])
  
  // گرفتن داده‌ها از API و پردازش آن‌ها
  const fetchOrdersData = async () => {
    try {
      const response = await axiosInstance.get('/courier/orders/count')
      const data = response.data
  
      if (!data.length) return
  
      const { jalali_year, jalali_month } = data[0]
      const daysInMonth = jalaali.jalaaliMonthLength(jalali_year, jalali_month)
  
      const labels = Array.from({ length: daysInMonth }, (_, i) => `${jalali_year}/${jalali_month}/${i + 1}`)
      const orderCounts = labels.map(day => {
        const order = data.find(o => `${o.jalali_year}/${o.jalali_month}/${o.jalali_day}` === day)
        return order ? order.count : 0
      })
  
      chartOptions.value.xaxis.categories = labels
      chartSeries.value[0].data = orderCounts
    } catch (error) {
      console.error('خطا در دریافت داده‌ها:', error)
    }
  }
  
  // بارگذاری داده‌ها هنگام mount شدن کامپوننت
  onMounted(fetchOrdersData)
  </script>
  