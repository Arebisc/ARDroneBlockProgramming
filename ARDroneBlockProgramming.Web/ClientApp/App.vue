<template>
    <v-app>
      <v-toolbar app>
        <v-toolbar-title>Programowanie Blockowe Drona ARDrone</v-toolbar-title>
      </v-toolbar>
      <v-navigation-drawer app></v-navigation-drawer>
      <v-content>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer></v-footer>
      
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
}

</script>

<style>

</style>
