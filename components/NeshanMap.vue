<template>
  <div class="page">
      <NeshanMap
          defaultType="neshan"
          mapKey="service.a18ab06933dd40b09e0325b192d59fb2"
          serviceKey="service.a18ab06933dd40b09e0325b192d59fb2"
          :center="{latitude: 36.311559, longitude: 59.5870851}"
          :zoom="14"
          :poi="true"
          :traffic="true"
          @on-init="onInit"
      />
  </div>
</template>
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

<script setup lang="ts">
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import { Map } from "@neshan-maps-platform/ol"
import {fromLonLat} from '@neshan-maps-platform/ol/proj'

function onInit(map:Map) {
  const view = map?.getView()
  view?.animate({
      center: fromLonLat([59.5870851, 36.311559]),
      zoom: 11,
      duration: 1000,
  })
}
</script>