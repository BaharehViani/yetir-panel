<template>
  <div id="container" class="bg-primary">
    <div class="oval-1" />
    <div class="oval-2" />
    <div class="oval-3" />
    <div class="oval-4" />

    <slot />
  </div>
</template>

<script>


</script>

<style lang="scss" scoped>
#container {
  height: 100vh;
  position: relative;

  .oval-1 {
    background: url("../assets/images/Oval.png") no-repeat;
    background-size: contain;
    width: 60%;
    height: 60%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .oval-2 {
    background: url("../assets/images/Oval.png") no-repeat;
    background-size: contain;
    width: 80%;
    height: 80%;
    transform: rotate(160deg);
    position: absolute;
    top: -10vh;
    left: -30vw;
  }

  .oval-3 {
    background: url("../assets/images/Oval.png") no-repeat;
    background-size: contain;
    width: 80%;
    height: 80%;
    transform: rotate(160deg);
    position: absolute;
    top: -40vh;
    right: 0;
  }

  .oval-4 {
    background: url("../assets/images/Oval.png") no-repeat;
    background-size: contain;
    width: 80%;
    height: 80%;
    transform: rotateY(180deg) rotateZ(-25deg);
    position: absolute;
    bottom: -20vh;
    right: -10vw;
  }
}
</style>