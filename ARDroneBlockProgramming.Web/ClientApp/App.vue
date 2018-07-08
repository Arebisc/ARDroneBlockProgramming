<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      app
      v-model="navigationDrawer"
    >
      <v-list dense>
        <v-list-tile @click="$router.push({ name: 'home' })" class="no-underscore">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Strona główna</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="navigationDrawer = !navigationDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>ARDrone blokowe programowanie</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex text-xs-center>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; Michał Sibera 2018</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  navigationDrawer: boolean = true;

}

</script>

<style scoped>

</style>
