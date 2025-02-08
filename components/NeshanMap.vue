<template>
  <div class="page">
      <NeshanMap
          defaultType="neshan"
          mapKey="web.a7ec788dd43d4eabac8c70f84f6ee84f"
          serviceKey="service.a18ab06933dd40b09e0325b192d59fb2"
          :center="{latitude: 38.0702, longitude: 46.3038}"
          :cluster="false"
          :hide-search-container="true"
          :zoom="14"
          :poi="true"
          :traffic="true"
          @on-init="onInit"
      />
  </div>
</template>

<script setup lang="ts">
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import { Map } from "@neshan-maps-platform/ol"
import {fromLonLat, toLonLat} from '@neshan-maps-platform/ol/proj'
import axios from "axios";
import { defineEmits } from "vue";

const API_KEY = "service.a18ab06933dd40b09e0325b192d59fb2"; // کلید API سرویس نشان

const emit = defineEmits(["updateAddress"]); // رویدادی برای ارسال آدرس به والد

function onInit(map:Map) {
  const view = map?.getView()
  view?.animate({
      center: fromLonLat([46.3038, 38.0702]),
      zoom: 13,
      duration: 1000,
  });

  map.on("click", async (event) => {
    const [lng, lat] = toLonLat(event.coordinate);
    const address = await getAddressFromNeshan(lat, lng);
    emit("updateAddress", { lat, lng, address });
  });
}

const getAddressFromNeshan = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await axios.get(
      `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
      {
        headers: { "Api-Key": API_KEY },
      }
    );
    return response.data.formatted_address || "آدرس نامشخص";
  } catch (error) {
    console.error("خطا در دریافت آدرس از نشان", error);
    return "آدرس نامشخص";
  }
};
</script>

<style>
  @import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
  html, body, .page, #app {
      width: 100%;
      height: 500px;
      display: block;
      padding: 0;
      margin: 0;
  }
</style>