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
import { defineEmits, ref } from "vue";
import polyline from "polyline";
import { Vector as VectorLayer } from "@neshan-maps-platform/ol/layer";
import { Vector as VectorSource } from "@neshan-maps-platform/ol/source";
import { LineString } from "@neshan-maps-platform/ol/geom";
import { Feature } from "@neshan-maps-platform/ol";
import { Point } from "@neshan-maps-platform/ol/geom";
import { Fill, Stroke, Style, Text, Icon } from "@neshan-maps-platform/ol/style";

const API_KEY = "service.a18ab06933dd40b09e0325b192d59fb2"; // کلید API سرویس نشان

const emit = defineEmits(["updateAddress"]); // رویدادی برای ارسال آدرس به والد

const routePath = ref<number[][]>([]);
let mapInstance: Map | null = null;

function onInit(map: Map) {
  mapInstance = map;
  setTimeout(() => {
    const view = map?.getView();
    view?.animate({
      center: fromLonLat([46.3038, 38.0702]),
      zoom: 13,
      duration: 1000,
    });
  }, 0);

  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
  map.addLayer(vectorLayer);

  map.on("click", async (event) => {
    const [lng, lat] = toLonLat(event.coordinate);
    const address = await getAddressFromNeshan(lat, lng);
    emit("updateAddress", { lat, lng, address });
  });

  if (routePath.value.length) {
    const coordinates = routePath.value.map((point) =>
      fromLonLat([point[0], point[1]])
    );
    const line = new LineString(coordinates);
    const feature = new Feature(line);
    vectorSource.addFeature(feature);
  }
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

const fetchRandomRoute = async (originAddress: string, destinationAddress: string) => {
  try {
    const geocode = async (address: string) => {
      try {
        const response = await axios.get(
          `https://api.neshan.org/v4/geocoding?address=${encodeURIComponent(address)}`,
          {
            headers: { "Api-Key": API_KEY },
          }
        );

        console.log("Geocode Response for", address, response.data);

        if (response.data.location) {
          return {
            lat: response.data.location.y,
            lng: response.data.location.x,
          };
        } else {
          console.error(`مختصات برای آدرس ${address} یافت نشد!`);
          return null;
        }
      } catch (error) {
        console.error(`خطا در تبدیل آدرس ${address} به مختصات`, error);
        return null;
      }
    };

    const origin = await geocode(originAddress);
    const destination = await geocode(destinationAddress);

    if (!origin || !destination) {
      console.error("مختصات مبدا یا مقصد دریافت نشد!");
      return;
    }

    const response = await axios.get(
      `https://api.neshan.org/v4/direction?type=car&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`,
      {
        headers: { "Api-Key": API_KEY },
      }
    );

    const encodedPolyline = response.data.routes[0].overview_polyline.points;
    routePath.value = polyline.decode(encodedPolyline);

    if (!mapInstance) {
      console.error("نقشه هنوز مقداردهی نشده است.");
      return;
    }

    if (routePath.value.length > 0) {
      const coordinates = routePath.value.map((point) => fromLonLat([point[1], point[0]]));
      const line = new LineString(coordinates);
      const feature = new Feature({ geometry: line });
      const routeStyle = new Style({
        stroke: new Stroke({
          color: "blue",
          width: 5,
        }),
      });

      mapInstance.getLayers().forEach(layer => {
        if (layer instanceof VectorLayer) {
          mapInstance?.removeLayer(layer);
        }
      });

      const vectorSource = new VectorSource({ features: [feature] });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: routeStyle,
      });
      mapInstance.addLayer(vectorLayer);

      const markerSource = new VectorSource();
      const markerLayer = new VectorLayer({ source: markerSource });

      const originFeature = new Feature({
        geometry: new Point(fromLonLat([origin.lng, origin.lat])),
      });
      const destinationFeature = new Feature({
        geometry: new Point(fromLonLat([destination.lng, destination.lat])),
      });

      originFeature.setStyle(
        new Style({
          image: new Icon({
            src: "/gps.png",
            scale: 0.06,
          }),
        })
      );
      destinationFeature.setStyle(
        new Style({
          image: new Icon({
            src: "/gps-red.png",
            scale: 0.06,
          }),
        })
      );

      markerSource.addFeature(originFeature);
      markerSource.addFeature(destinationFeature);

      mapInstance.addLayer(markerLayer);

      const centerLat = (origin.lat + destination.lat) / 2;
      const centerLng = (origin.lng + destination.lng) / 2;

      const view = mapInstance.getView();
      setTimeout(() => {
        view.animate({
          center: fromLonLat([centerLng, centerLat]),
          zoom: 13,
          duration: 1000,
        });
      }, 1000);
    }
  } catch (error) {
    console.error("خطا در دریافت مسیر از نشان", error);
  }
};

defineExpose({ fetchRandomRoute });
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