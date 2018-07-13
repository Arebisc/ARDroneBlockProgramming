<template>
    <v-layout row>
        <v-flex xs4 class="actions__wrapper">
            <h1 class="actions-header">Akcje</h1>
            <draggable v-model="droneActions" style="margin-bottom: 50px" :options="{ 
                group: { name: 'drone-actions-group', pull:'clone', put:false }, sort: false }"
                class="actions-container">
                <action-tile v-for="(element, index) in droneActions"
                    :key="index"
                    :drone-action="element">
                </action-tile>
            </draggable>
        </v-flex>
        <v-flex xs8 class="user-defined-actions__wrapper">
            <h1>Blok instrukcji do wykonania</h1>
            <h3>Początek</h3>
            <draggable v-model="userDefinedActions" :options="{ group: 'drone-actions-group' }" class="user-defined-actions-contaner">
                <action-tile v-for="(element, index) in userDefinedActions" 
                    :key="index" 
                    :droneAction="element"
                    :index="index"
                    :arrayContaining="userDefinedActions">
                </action-tile>
            </draggable>
            <h3>Koniec</h3>
            <p class="actions-info-text">Umieszczaj akcje powyżej</p>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { DroneAction } from '../../classes/DroneAction';
import ActionTileComponent from './ActionTile.vue';
import { ActionType } from './../../types/ActionType';


@Component({
    components: {
        draggable,
        'action-tile': ActionTileComponent
    }
})
export default class Home extends Vue {

    droneActions: DroneAction[] = [
        new DroneAction('Do góry', ActionType.Up),
        new DroneAction('W dół', ActionType.Down),
        new DroneAction('W lewo', ActionType.Left),
        new DroneAction('W prawo', ActionType.Right),
        new DroneAction('Do przodu', ActionType.Forward),
        new DroneAction('Do tyłu', ActionType.Back)
    ];

    userDefinedActions: DroneAction[] = [];

    valid: boolean = false;

    submitForm() {
        console.log('submitted');
    }
}
</script>

<style scoped>
.actions__wrapper,
.user-defined-actions__wrapper,
.actions-parameters__wrapper {
    margin: 30px;
    background: #ffffff;
    padding: 15px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
