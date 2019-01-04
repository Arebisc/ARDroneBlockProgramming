<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      app
      clipped
      v-model="navigationDrawer"
      class="navigation-drower"
    >
      <v-list dense>
        <v-list-tile @click="$router.push({ name: 'home' })" class="router-link">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Strona główna:
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="$router.push({ name: 'navdata' })" class="router-link">
          <v-list-tile-action>
            <v-icon>gps_fixed</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Dane nawigacyjne:
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>local_see</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Dron widzi:
          </v-list-tile-content>
        </v-list-tile>
        <div class="list__container drone-sees-list">
          <v-list-tile v-for="(tag, index) in droneSees" :key="index">
            <v-list-tile-content>
              {{ tag }}
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar color="indigo" fixed app clipped-left light>
      <v-toolbar-title class="main-title">ARDrone blokowe programowanie</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="white--text">
        <v-tooltip class="restrictions-switch__container"
          close-delay="1000"
          bottom
          flat
          >
          <v-switch
            label="Tryb z ograniczeniami"
            v-model="restrictionsSwitch"
            slot="activator"
          ></v-switch>
          <span>
            Tryb ten ogranicza zasięg (od miejsca wystartowania) drona do wartości zdefiniowanej po lewej stronie. 
            Jeżeli w trakcie misji maszyna przekroczy te wartość - to misja zostanie przerwana i dron zawiśnie bezczynnie w powietrzu.
          </span>
        </v-tooltip>
        <v-tooltip
          close-delay="1000"
          bottom
          flat
          >
          <v-text-field flat class="restrictions-distance__input" v-model="restrictionsInput" slot="activator" box></v-text-field>
          <span>Odległość graniczna jakiej nie może dron przekroczyć (w metrach).</span>
        </v-tooltip>
        <v-tooltip
          close-delay="1000"
          bottom
          flat
          >
          <v-btn flat slot="activator" >Przerwij i wyląduj</v-btn>
          <span>W dowolnym momencie możesz przerwać misję. Dron natychmiast wyląduje na ziemi.</span>
        </v-tooltip>
        <v-tooltip
          close-delay="1000"
          bottom
          flat
          >
          <v-btn flat slot="activator" class="red--text">Wyłącz napędy</v-btn>
          <span>W dowolnym momencie lotu, możesz wyłączyć napędy. UWAGA! Dron opadnie bezwładnie na ziemię. Może to spowodować jego uszkodzenie.</span>
        </v-tooltip>
      </v-toolbar-items>
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
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters({
      droneSees: 'droneSees'
    })
  }
})
export default class App extends Vue {
  navigationDrawer: boolean = true;
  tagsInDroneRange: string[] = new Array();
  restrictionsSwitch: boolean = false;
  restrictionsInput: number = 0;
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

.drone-sees-list {
  overflow-y: scroll;
  height: 50vh;
}

.drone-sees-list::-webkit-scrollbar {
  width: 6px;
}

.drone-sees-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.drone-sees-list::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategray;
}

.restrictions-switch__container {
  margin-top: 18px;
}

.restrictions-distance__input{
  width: 45px;
  margin-left: 13px;
}
</style>
