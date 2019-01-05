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
        <v-tooltip
          close-delay="1000"
          bottom
          flat
          >
          <div slot="activator">
            <v-text-field flat class="restrictions-distance__input" v-model="restrictionsInput" box></v-text-field>
          </div>
          <span>
            Tryb ten ogranicza zasięg (od miejsca wystartowania) drona do zdefiniowanej wartości (podanej w metrach).
            Jeżeli w trakcie misji maszyna przekroczy ją - to misja zostanie przerwana i dron zawiśnie bezczynnie w powietrzu.
            Wartość 0 oznacza brak trybu.
          </span>
        </v-tooltip>
        <v-btn flat @click="setRestrictedMode()">Ustaw tryb organiczony</v-btn>
        <v-tooltip
          close-delay="1000"
          bottom
          flat
          >
          <v-btn flat slot="activator" @click="stopAndLand()">Przerwij i wyląduj</v-btn>
          <span>W dowolnym momencie możesz przerwać misję. Dron natychmiast wyląduje na ziemi.</span>
        </v-tooltip>
        <!-- <v-tooltip
          close-delay="1000"
          bottom
          flat
          >
          <v-btn flat slot="activator" @click="resetDroneStopState()">Resetuj zatrzymanie drona</v-btn>
          <span>Jeżeli zatrzymałeś drona, lub zatrzymałeś silniki - musisz przywrócić jego funkcjonalność.</span>
        </v-tooltip> -->
        <v-tooltip
          close-delay="1000"
          bottom
          flat
          >
          <v-btn flat slot="activator" class="red--text" @click="disableDroneMotors()">Wyłącz napędy</v-btn>
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
          <v-alert
              :value="errorTextAlert"
              type="error"
              transition="scale-transition"
              class="custom-alert"
              >
              {{ errorText }}
          </v-alert>
          <v-alert
              :value="confirmationAlert"
              type="success"
              transition="scale-transition"
              class="custom-alert"
              >
              {{ confirmationText }}
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
  restrictionsInput: number = 0;

  snackbar = false;
  snackbarText = "";
  
  signalRConnection!: HubConnection;

  recognizedObjectAlert: boolean = false;
  recognizedObject: string = "";

  errorTextAlert: boolean = false;
  errorText: string = "";

  confirmationText: string = "";
  confirmationAlert: boolean = false;

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

    this.initializeSignalREvents();

    await this.signalRConnection.start();
  }

  initializeSignalREvents() {
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

    this.signalRConnection.on('SendDroneFinishedActionsWithErrorsToClient', () => {
      if(this.errorTextAlert) {
        this.hideErrorAlert();
      }

      this.showError("Misja przerwana! Pamiętaj o odblokowaniu drona przed kolejną.");
    });

    this.signalRConnection.on('RestrictedModeConfirmation', (confirmationValue) => {
      this.restrictionsInput = confirmationValue;
      
      if(confirmationValue !== 0) {
        this.showConfirmationAlert(`Tryb restrykcji ustawiony na: ${confirmationValue} metrów`);
      }
      else {
        this.showConfirmationAlert(`Wyłączono tryb restrykcji`);
      }
    });
  }

  showRecognizedObjectAlert(recognizedObject: string) {
    this.recognizedObject = recognizedObject;
    this.recognizedObjectAlert = true;

    setTimeout(() => {
        this.hideRecognizedObjectAlert();
    }, 3000);
  }

  hideRecognizedObjectAlert() {
    this.recognizedObjectAlert = false;
    this.recognizedObject = "";
  }

  showConfirmationAlert(confirmationText: string) {
    this.confirmationAlert = true;
    this.confirmationText = confirmationText;

    setTimeout(() => {
      this.hideConfirmationAlert();
    }, 3000);
  }

  hideConfirmationAlert() {
    this.confirmationAlert = false;
    this.confirmationText = "";
  }

  async disableDroneMotors() {
    await this.signalRConnection.invoke("SendDisableDroneMotors");
    this.$store.dispatch('resetActionCounter');
  }

  async resetDroneStopState() {
    await this.signalRConnection.invoke("SendResetDroneStopState");
  }

  async stopAndLand() {
    await this.signalRConnection.invoke("SendStopAndLand");
  }

  async setRestrictedMode() {
    await this.signalRConnection.invoke("SendRestrictedModeDistance", this.restrictionsInput);
  }

  showError(errorText: string) {
    this.errorTextAlert = true;
    this.errorText = errorText;

    setTimeout(() => {
      this.hideErrorAlert();
    }, 3000);
  }

  hideErrorAlert() {
    this.errorTextAlert = false;
    this.errorText = "";
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
