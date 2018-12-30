<template>
    <v-layout row>
        <v-flex xs12 class="navdata__wrapper">
            <h1>Navdata page</h1>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component
export default class Navdata extends Vue {

    signalRConnection!: HubConnection;

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

        this.signalRConnection.on('DroneRecognizedTagsToClient', (tags) => {
            console.log(tags);
            this.$store.dispatch('setTagsWhichDroneSees', tags);
        });

        this.signalRConnection.on('DroneSendsNavdata', (navdata) => {
            this.$store.dispatch('setNavdata', navdata);
        });

        await this.signalRConnection.start();
    }
}
</script>

<style scoped>
.navdata__wrapper {

}
</style>
