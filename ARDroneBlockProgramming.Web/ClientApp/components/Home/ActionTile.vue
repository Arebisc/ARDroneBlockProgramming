<template>
    <div>
        <v-layout row wrap class="action-tile" v-if="arrayContaining == null">
            <v-flex xs12 class="single-action-name">
                {{ droneAction.actionLabel }}
            </v-flex>
        </v-layout>
        <v-layout row wrap class="action-tile" v-if="arrayContaining != null">
            <v-flex xs3>
                {{ droneAction.actionLabel }}
            </v-flex>
            <v-flex xs8>
                <v-text-field
                    v-model="speed"
                    label="Prędkość"
                    required
                    class="params-input"
                ></v-text-field>
                <v-text-field
                    v-model="time"
                    label="Czas trwania"
                    required
                    class="params-input"
                ></v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-icon @click="handleRemove">remove_circle</v-icon>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { DroneAction } from '../../classes/DroneAction';


@Component
export default class Home extends Vue {
    @Prop(DroneAction) droneAction!: DroneAction;
    @Prop(Number) index!: number;
    @Prop(Array) arrayContaining!: Array<DroneAction>;

    speed!: number | null;
    time!: number | null;

    handleRemove() :void {
        this.arrayContaining.splice(this.index, 1);
    }
}
</script>

<style scoped>
.action-tile {
    background: #f5f3f3;
    font-size: 18px;
    padding: 10px 5px 5px 10px;
    margin-bottom: 10px;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.action-tile:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.action-tile .params-input {
    max-width: 50%;
    float: left;
    margin-left: 40px;
}

.action-tile .single-action-name {
    margin: 10px 0 10px 0;
}
</style>
