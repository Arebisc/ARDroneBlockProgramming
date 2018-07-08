<template>
    <v-layout row>
        <v-flex xs4 class="actions-wrapper">
            <h1>Akcje</h1>
            <draggable v-model="droneActions" style="margin-bottom: 50px" :options="{ 
                group: { name: 'drone-actions-group', pull:'clone', put:false }, sort: false }"
                class="actions-container">
                <div v-for="(element, index) in droneActions" :key="index" class="action-tile">{{ element.actionLabel }}</div>
            </draggable>
        </v-flex>
        <v-flex xs4>
            <h1>Blok instrukcji do wykonania</h1>
            <h3>Start</h3>
            <draggable v-model="userDefinedActions" :options="{ group: 'drone-actions-group' }" class="user-defined-actions-contaner">
                <div v-for="(element, index) in userDefinedActions" :key="index" class="action-tile">{{ element.actionLabel }}</div>
            </draggable>
            <p class="text-center">Umieszczaj akcje powyżej</p>
            <h3>Koniec</h3>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { DroneAction } from '../../classes/DroneAction';


@Component({
    components: {
        draggable
    },
})
export default class Home extends Vue {
    droneActions: DroneAction[] = [
            new DroneAction('UP'),
            new DroneAction('DOWN'),
            new DroneAction('Left'),
            new DroneAction('Right')
        ];

    userDefinedActions: DroneAction[] = [];
}
</script>

<style scoped>
.actions-wrapper {
    margin-right: 15px;
}

.actions-containter {
    width: 100%;
    background: #ffffff;
    margin: 5px;
    padding: 5px;
}

.action-tile {
    width: 100%;
    background: #eaeaea;
    height: 50px;
    font-size: 18px;
    padding: 5px;
}

.user-defined-actions-contaner {
    min-height: 50px;
    background: #ffffff;
    padding-bottom: 50px;
}
</style>
