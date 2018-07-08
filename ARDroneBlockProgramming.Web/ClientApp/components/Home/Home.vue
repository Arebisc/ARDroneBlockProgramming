<template>
    <v-layout row>
        <v-flex xs4 class="actions__wrapper">
            <h1 class="actions-header">Akcje</h1>
            <draggable v-model="droneActions" style="margin-bottom: 50px" :options="{ 
                group: { name: 'drone-actions-group', pull:'clone', put:false }, sort: false }"
                class="actions-container">
                <action-tile v-for="(element, index) in droneActions" :key="index" :action="element"></action-tile>
            </draggable>
        </v-flex>
        <v-flex xs4 class="user-defined-actions__wrapper">
            <h1>Blok instrukcji do wykonania</h1>
            <h3>Start</h3>
            <draggable v-model="userDefinedActions" :options="{ group: 'drone-actions-group' }" class="user-defined-actions-contaner">
                <div v-for="(element, index) in userDefinedActions" :key="index" class="action-tile">{{ element.actionLabel }}</div>
            </draggable>
            <p class="actions-info-text">Umieszczaj akcje powyżej</p>
            <h3>Koniec</h3>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { DroneAction } from '../../classes/DroneAction';
import ActionTileComponent from './ActionTile.vue';


@Component({
    components: {
        draggable,
        'action-tile': ActionTileComponent
    }
})
export default class Home extends Vue {

    droneActions: DroneAction[] = [
        new DroneAction('Do góry'),
        new DroneAction('W dół'),
        new DroneAction('W lewo'),
        new DroneAction('W prawo'),
        new DroneAction('Do przodu'),
        new DroneAction('Do tyłu')
    ];

    userDefinedActions: DroneAction[] = [];
}
</script>

<style scoped>
.actions__wrapper,
.user-defined-actions__wrapper
 {
    margin: 30px;
    background: #ffffff;
    padding: 15px;
}

.actions-containter {
    width: 100%;
    margin: 5px;
    padding: 5px;
}

.user-defined-actions-contaner {
    min-height: 50px;
    background: #ffffff;
    padding-bottom: 50px;
}

.actions-header{
    margin-bottom: 30px;
}

.actions-info-text {
    text-align: center;
    color: #979797;
    font-size: 15px;
    font-weight: bold;
}
</style>
