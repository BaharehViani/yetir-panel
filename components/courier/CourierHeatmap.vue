<template>
  <div>
    <apexchart type="heatmap" :options="chartOptions" :series="chartSeries" height="350" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '~/utils/axiosinstance.js'

// 🔹 ترتیب جدید روزهای هفته (جمعه = ۰، شنبه = ۶)
const weekDays = ['جمعه', 'پنج‌شنبه', 'چهارشنبه', 'سه‌شنبه', 'دوشنبه', 'یکشنبه', 'شنبه']

// 🔹 بازه‌های زمانی ۶ ساعته
const timeSlots = ['00:00-05:59', '06:00-11:59', '12:00-17:59', '18:00-23:59']

// 🔹 مقداردهی اولیه سری‌های نمودار
const chartSeries = ref(timeSlots.map(slot => ({ name: slot, data: Array(7).fill(0) })))

// 🔹 تنظیمات نمودار
const chartOptions = ref({
  chart: { id: 'weekly-activity', fontFamily: "Yekan Bakh FaNum" },
  dataLabels: { enabled: true },
  colors: ['#e0f7e9', '#b2f0b5', '#74e377', '#32cd32'], // طیف سبز از کم‌فعالیت تا خیلی پرترافیک
  xaxis: { categories: weekDays, title: { text: 'روزهای هفته' } },
  yaxis: { title: { text: 'بازه‌های زمانی' } },
  title: { text: 'فعالیت پیک در طول هفته', align: 'center' },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      colorScale: { 
        ranges: [
          { from: 0, to: 1, color: '#e0f7e9' }, 
          { from: 2, to: 3, color: '#b2f0b5' }, 
          { from: 4, to: 5, color: '#74e377' }, 
          { from: 6, to: 20, color: '#32cd32' }
        ] 
      }
    }
  }
})

// 🔹 دریافت داده‌ها از API
const fetchOrdersData = async () => {
  try {
    const response = await axiosInstance.get('/courier/orders/heat')
    const data = response.data

    // مقداردهی آرایه اولیه با صفر
    const heatmapData = Array(4).fill(0).map(() => Array(7).fill(0))

    // جایگذاری مقادیر دریافت شده از API
    data.forEach(({ day, slot, count }) => {
      heatmapData[slot][day] = count
    })

    // اعمال داده‌ها به سری‌های نمودار
    chartSeries.value.forEach((series, i) => {
      series.data = heatmapData[i]
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// 🔹 دریافت داده‌ها هنگام mount شدن کامپوننت
onMounted(fetchOrdersData)
</script>

<style lang="scss" scoped></style>