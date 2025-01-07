<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      location="right"
      @click="rail = false"
    >
      <v-list-item
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-right"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" ></v-list-item>
        <v-list-item prepend-icon="mdi-chart-line"></v-list-item>
        <v-list-item prepend-icon="mdi-book" ></v-list-item>
        <v-list-item prepend-icon="mdi-format-list-bulleted" ></v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-cog"></v-list-item>
          <v-list-item prepend-icon="mdi-help-circle" ></v-list-item>
          <v-list-item prepend-icon="mdi-logout" @click="logout"></v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-title>Quantime</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-text-field
        density="compact"
        variant="solo"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        class="mt-2"
        style="max-width: 300px"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

</script>