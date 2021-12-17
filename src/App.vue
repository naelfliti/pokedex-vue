<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            containi
            min-width="100"
            src="./assets/text-logo.png"
            width="100"
          />
        </div> 
      </router-link>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
html {
  font-size: 62.5%;
}
.v-application {
  font-family: "Montserrat", sans-serif;
}
</style>
<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
