<script setup>
import { onMounted, ref } from "vue";

const map = ref(null);
const marker = ref(null);
const center = ref([51.389, 35.689]); // تهران
const API_KEY = "YOUR_NESHAN_API_KEY"; // کلید API خودت را اینجا بگذار

onMounted(() => {
  map.value = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: `https://api.neshan.org/v1/map/static?key=${API_KEY}&type=neshan&zoom=14&center=${center.value[1]},${center.value[0]}`,
        }),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(center.value),
      zoom: 14,
    }),
  });

  // اضافه کردن مارکر
  marker.value = new ol.Overlay({
    position: ol.proj.fromLonLat(center.value),
    positioning: "center-center",
    element: document.getElementById("marker"),
  });

  map.value.addOverlay(marker.value);

  // کلیک برای تغییر مکان مارکر
  map.value.on("click", (event) => {
    const coords = ol.proj.toLonLat(event.coordinate);
    marker.value.setPosition(event.coordinate);
    console.log("مختصات انتخاب شده:", coords);
  });
});
</script>

<template>
  <div class="map-container">
    <div id="map"></div>
    <div id="marker" class="marker"></div>
  </div>
</template>

<style>
.map-container {
  width: 100%;
  height: 400px;
  position: relative;
}
#map {
  width: 100%;
  height: 100%;
}
.marker {
  width: 24px;
  height: 24px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>
