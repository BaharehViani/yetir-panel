<template>
  <div class="page">
      <NeshanMap
          defaultType="neshan"
          mapKey="web.a7ec788dd43d4eabac8c70f84f6ee84f"
          serviceKey="service.a18ab06933dd40b09e0325b192d59fb2"
          :center="{latitude: 38.0702, longitude: 46.3038}"
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
      height: 600px;
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
      center: fromLonLat([46.3038, 38.0702]),
      zoom: 13,
      duration: 1000,
  })
}
</script>