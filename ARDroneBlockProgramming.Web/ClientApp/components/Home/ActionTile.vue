<template>
    <v-layout row wrap class="action-tile">
        <v-flex xs6>
            {{ droneAction.actionLabel }}
        </v-flex>
        <v-flex xs6>
            <v-icon>remove_circle</v-icon>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { DroneAction } from '../../classes/DroneAction';


@Component({
    props: {
        droneAction: DroneAction
    }
})
export default class Home extends Vue {
    
}
</script>

<style scoped>
.action-tile {
    width: 100%;
    background: #f5f3f3;
    font-size: 18px;
    padding: 10px 5px 5px 10px;
}
</style>
