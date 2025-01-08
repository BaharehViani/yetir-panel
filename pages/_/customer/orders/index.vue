<template>
  <div class="w-274 pb-8 bg-[#FFFFFF] new-order flex-column rounded-2xl pl-6">
<!--    <v-data-table-->
<!--      :headers="headers"-->
<!--      :items="items"-->
<!--      class="elevation-1"-->
<!--      item-value="id"-->
<!--    >-->
<!--      <template #item.status="{ item }">-->
<!--        <span :class="getStatusClass(item.status)">{{ item.status }}</span>-->
<!--      </template>-->
<!--    </v-data-table>-->
  </div>
</template>
<script setup>
import axiosInstance from "~/utils/axiosinstance.js";
import Cookies from 'js-cookie';

definePageMeta({
  layout: 'panel'
})

const items = ref({
  id: null,
  type: null,
  created_at: null,
  pickup_location: null,
  dropoff_location: null,
  fee: null,
  status: null
})

// Table headers
const headers = ref([
  { text: "ID", value: "id" },
  { text: "Type", value: "type" },
  { text: "Created At", value: "created_at" },
  { text: "Pickup Location", value: "pickup_location" },
  { text: "Dropoff Location", value: "dropoff_location" },
  { text: "Fee", value: "fee" },
  { text: "Status", value: "status" },
]);

// Fetch order list
const fetchOrderList = async () => {
  try {
    const response = await axiosInstance.get("/customer/orders");
    items.value = response.data;
    console.log(response)// Update the table data with the fetched response
  } catch (e) {
    console.error("Error fetching order list:", e);
  }
};

// Status class handler
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-green";
    case "rejected":
      return "text-red";
    case "pending":
      return "text-orange";
    default:
      return "";
  }
};

// Fetch data on component mount
onMounted(fetchOrderList);
</script>


<style lang="scss" scoped>
.text-green {
  color: green;
}
.text-red {
  color: red;
}
.text-orange {
  color: orange;
}
</style>

