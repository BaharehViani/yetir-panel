<template>
<v-app>
    <div id="form-container" class="flex flex-col flex-row">
        <v-row no-gutters class="bg-primary">
            <v-col :cols="6" class="bg-primary flex flex-col items-center justify-center">
                <div>
                    <v-img
                    :width="600"
                    :draggable="false"
                    cover
                    src="../assets/images/moto-login.png"
                    
                />
                <div class="text-center relative">
                    <div class="text-center text-basic text-4xl font-weight-black absolute inset-x-0 top-0">با یه‌تیر، سه نشون بزن!</div>
                    <div></div>
                </div>
                </div>
            </v-col>
            <v-col :cols="6" class="flex justify-center items-center rounded-tr-3xl rounded-br-3xl shadow-lg bg-white">
                <div>
                    <slot />
                </div>
            </v-col>
        </v-row>
    </div>
</v-app>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#form-container {
    height: 100vh;
}
</style>