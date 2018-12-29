<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed app clipped v-model="navigationDrawer" class="navigation-drower">
      <v-list dense>

        <img :src="'data:image/png;base64,' + pngBufferBase64" class="video-stream">

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>local_see</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Dron widzi:</v-list-tile-content>
        </v-list-tile>

        <div class="list__container drone-sees-list">
          <v-list-tile v-for="(tag, index) in droneSees" :key="index">
            <v-list-tile-content>{{ tag }}</v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" fixed app clipped-left light>
      <v-toolbar-title class="main-title">ARDrone blokowe programowanie</v-toolbar-title>
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
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters({
      droneSees: "droneSees",
      pngBufferBase64: "pngBufferBase64"
    })
  }
})
export default class App extends Vue {
  navigationDrawer: boolean = true;
  tagsInDroneRange: string[] = new Array();
}
</script>

<style scoped>
.main-title {
  color: #ffffff;
}

.navigation-drower {
  box-shadow: 10px 0 5px -2px #888;
  -webkit-box-shadow: 10px 0 5px -2px #888;

  overflow: hidden;
}

.no-underscore {
  text-decoration: none;
  margin-bottom: 20px;
}

.video-stream {
  width: 100%;
  padding: 3px;
}

.recognized-object {
  border: 3px solid green;
}

.drone-sees-list {
  overflow-y: scroll;
  height: 50vh;
}

.drone-sees-list::-webkit-scrollbar {
    width: 6px;
}
 
.drone-sees-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
 
.drone-sees-list::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
