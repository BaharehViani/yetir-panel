<template>
  <v-app>
    <div id="container" class="bg-primary flex justify-center align-center">
      <div class="oval-1" />
      <div class="oval-2" />
      <div class="oval-3" />
      <div class="oval-4" />
      <v-card
        color="#ffffff"
        class="bill-container items-center justify-center align-center rounded-3xl"
      >
        <v-card-text>
          <slot />
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
#container {
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;

  .oval-1 {
    background: url('../assets/images/Oval.png') no-repeat;
    background-size: contain;
    width: 60%;
    height: 60%;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .oval-2 {
    background: url('../assets/images/Oval.png') no-repeat;
    background-size: contain;
    width: 80%;
    height: 80%;
    transform: rotate(160deg);
    position: fixed;
    top: -10vh;
    left: -30vw;
  }

  .oval-3 {
    background: url('../assets/images/Oval.png') no-repeat;
    background-size: contain;
    width: 80%;
    height: 80%;
    transform: rotate(160deg);
    position: fixed;
    top: -40vh;
    right: 0;
  }

  .oval-4 {
    background: url('../assets/images/Oval.png') no-repeat;
    background-size: contain;
    width: 80%;
    height: 80%;
    transform: rotateY(180deg) rotateZ(-25deg);
    position: fixed;
    bottom: -20vh;
    right: -10vw;
  }
}

.bill-container {
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
}

.rounded-3xl {
  border-radius: 1.5rem /* 24px */;
}
</style>
