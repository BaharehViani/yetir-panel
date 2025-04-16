<template>
  <div>
    <apexchart type="heatmap" :options="chartOptions" :series="chartSeries" height="350"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '~/utils/axiosinstance.js'

const weekDays = ['جمعه', 'پنج‌شنبه', 'چهارشنبه', 'سه‌شنبه', 'دوشنبه', 'یکشنبه', 'شنبه']

const timeSlots = ['00:00-05:59', '06:00-11:59', '12:00-17:59', '18:00-23:59']

const chartSeries = ref(timeSlots.map(slot => ({ name: slot, data: Array(7).fill(0) })))

const chartOptions = ref({
  chart: { id: 'weekly-activity', fontFamily: "Yekan Bakh FaNum" },
  dataLabels: { enabled: true },
  colors: ['#e0f7e9', '#b2f0b5', '#74e377', '#32cd32'],
  xaxis: { categories: weekDays, title: { text: 'روزهای هفته' } },
  yaxis: { title: { text: 'بازه‌های زمانی' } },
  title: { text: 'فعالیت پیک در طول ماه', align: 'center' },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      colorScale: { 
        ranges: [
          // { from: 0, to: 1, color: '#e0f7e9' }, 
          // { from: 2, to: 3, color: '#b2f0b5' }, 
          // { from: 4, to: 5, color: '#74e377' }, 
          // { from: 6, to: 20, color: '#32cd32' }

          { from: 0, to: 2, color: '#e0f7e9' }, 
          { from: 3, to: 5, color: '#b2f0b5' }, 
          { from: 6, to: 9, color: '#74e377' }, 
          { from: 10, to: 15, color: '#32cd32' }
        ] 
      }
    }
  }
})

const fetchOrdersData = async () => {
  try {
    const response = await axiosInstance.get('/courier/orders/heat')
    const data = response.data

    // const heatmapData = Array(4).fill(0).map(() => Array(7).fill(0))

    // data.forEach(({ day, slot, count }) => {
    //   heatmapData[slot][day] = count
    // })
    //---------------------------------
    // fake data
    const heatmapData = [
      [1, 2, 1, 0, 2, 1, 0], // 00:00-05:59
      [2, 3, 4, 2, 8, 2, 5], // 06:00-11:59
      [8, 4, 7, 4, 3, 5, 6], // 12:00-17:59
      [7, 12, 9, 14, 5, 11, 6]  // 18:00-23:59
    ]
    //----------------------------------

    chartSeries.value.forEach((series, i) => {
      series.data = heatmapData[i]
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchOrdersData)
</script>

<style scoped></style>