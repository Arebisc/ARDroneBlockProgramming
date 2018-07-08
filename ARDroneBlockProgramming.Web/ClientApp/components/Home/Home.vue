<template>
    <v-layout row>
        <v-flex xs4>
            <h1>Akcje</h1>
            <draggable v-model="droneActions" style="margin-bottom: 50px" :options="{ group: { name: 'drone-actions-group', pull:'clone' } }" class="actions-container">
                <div v-for="(element, index) in droneActions" :key="index" class="action-tile">{{ element.actionLabel }}</div>
            </draggable>
        </v-flex>
        <v-flex xs4>
            <h1>Blok instrukcji do wykonania</h1>
            <draggable v-model="userDefinedActions" :options="{ group: 'drone-actions-group' }" class="user-defined-actions">
                <div v-for="(element, index) in userDefinedActions" :key="index">{{ element.actionLabel }}</div>
            </draggable>
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

<style>
.actions-containter {
    width: 100%;
}

.action-tile {
    width: 100%;
    background: #ffffff;
    height: 50px;
    font-size: 18px;
}

.user-defined-actions {
    min-height: 50px;
}
</style>
