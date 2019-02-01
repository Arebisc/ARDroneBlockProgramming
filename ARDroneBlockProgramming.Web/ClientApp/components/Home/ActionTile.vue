<template>
    <div>
        <v-layout row wrap class="action-tile" v-if="arrayContaining == null">
            <v-flex xs12 class="single-action-name">
                {{ droneAction.actionLabel }}
            </v-flex>
        </v-layout>
        <v-layout row wrap class="action-tile" :class="index === (droneActionStateCounter - 1) ? 'active' : ''" v-if="arrayContaining != null">
            <v-flex xs3>
                {{ droneAction.actionLabel }}
            </v-flex>
            <v-flex xs8>
                <v-text-field
                    v-model="droneAction.speed"
                    label="Prędkość (od 0 do 1)"
                    required
                    class="params-input"
                ></v-text-field>
                <v-text-field
                    v-model="droneAction.duration"
                    :label="renderTimeInformation()"
                    required
                    class="params-input"
                ></v-text-field>
                <v-text-field
                    v-model="droneAction.tag"
                    label="Szukany element"
                    required
                    class="params-input searching-element-input"
                    v-if="tagInputConditionalRendering">
                </v-text-field>
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
import { DroneAction } from '../../classes/DroneAction';
import { ActionType } from '../../types/ActionType';
import { mapGetters } from 'vuex';


@Component({
  computed: {
    ...mapGetters({
      droneActionStateCounter: 'droneActionStateCounter'
    })
  }
})
export default class Home extends Vue {
    @Prop(DroneAction) droneAction!: DroneAction;
    @Prop(Number) index!: number;
    @Prop(Array) arrayContaining!: Array<DroneAction>;
    @Prop(String) tag!: string;

    handleRemove() :void {
        this.arrayContaining.splice(this.index, 1);
    }

    get tagInputConditionalRendering(): boolean {
        if(this.droneAction.actionType == ActionType.TurnRightTillRecognize) {
            return true;
        }
        else if(this.droneAction.actionType == ActionType.TurnLeftTillRecognize) {
            return true;
        }

        return false;
    }

    renderTimeInformation(): string {
        var intervalTime = "Interwał czasowy (w ms)";
        var durationTime = "Czas trwania (w ms)"

        if(this.droneAction.actionType === ActionType.TurnRightTillRecognize ||
            this.droneAction.actionType === ActionType.TurnLeftTillRecognize) {
            return intervalTime;
        }   
        
        return durationTime;
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

.searching-element-input {
    width: 100%;
}

.active {
    background: #A1CE42;
}
</style>
