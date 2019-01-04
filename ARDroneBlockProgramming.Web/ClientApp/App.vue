<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      app
      clipped
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
            <router-view :signalRConnection="signalRConnection"></router-view>
          </v-flex>
          <v-snackbar
            v-model="snackbar"
            bottom
          >
            {{ snackbarText }}
            <v-btn
                color="pink"
                flat
                @click="snackbar = false; snackbarText=''"
                >
                Close
            </v-btn>
          </v-snackbar>
          <v-alert
              :value="recognizedObjectAlert"
              type="success"
              transition="scale-transition"
              class="custom-alert"
              >
              {{ "Rozpoznano: " + recognizedObject }}
          </v-alert>
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
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  computed: {
    ...mapGetters({
      droneSees: 'droneSees'
    })
  }
})
export default class App extends Vue {
  tagsInDroneRange: string[] = new Array();
  restrictionsSwitch: boolean = false;
  restrictionsInput: number = 0;

  snackbar = false;
  snackbarText = "";
  
  signalRConnection!: HubConnection;

  recognizedObjectAlert: boolean = false;
  recognizedObject: string = "";

  async created() {
    await this.initializeSignalRConnection();
  }

  async beforeDestroy() {
    await this.signalRConnection.stop();
  }

  async initializeSignalRConnection() {
    this.signalRConnection = new HubConnectionBuilder()
        .withUrl('/droneHub')
        .build();

    this.signalRConnection.on('SendDroneFinishedActionsToClient', () => {
        this.snackbarText = "Dron zakończył wykonywanie poleceń";
        this.snackbar = true;

        this.$store.dispatch('resetActionCounter');
    });

    this.signalRConnection.on('DroneRecognizedTagsToClient', (tags) => {
        console.log(tags);
        this.$store.dispatch('setTagsWhichDroneSees', tags);
    });

    this.signalRConnection.on('AlertRecognizedObject', (recognizedObject) => {
        if(this.recognizedObjectAlert) {
            this.hideRecognizedObjectAlert();
        }
        this.showRecognizedObjectAlert(recognizedObject);
    });

    this.signalRConnection.on('DroneFinishedAction', () => {
        this.$store.dispatch('incrementActionCounter');
    });

    await this.signalRConnection.start();
  }

  showRecognizedObjectAlert(recognizedObject: string) {
    this.recognizedObjectAlert = true;
    this.recognizedObject = recognizedObject;

    setTimeout(() => {
        this.hideRecognizedObjectAlert();
    }, 3000);
  }

  hideRecognizedObjectAlert() {
      this.recognizedObjectAlert = false;
      this.recognizedObject = "";
  }

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

.custom-alert {
  position: fixed;
  top: 6%;
  width: 22%;
  margin-left: 45%;
}
</style>
