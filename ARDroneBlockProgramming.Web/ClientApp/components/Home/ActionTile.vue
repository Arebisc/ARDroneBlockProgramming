<template>
    <div class="action-tile">{{ action.actionLabel }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { DroneAction } from '../../classes/DroneAction';


@Component({
    props: {
        action: DroneAction
    }
})
export default class Home extends Vue {

}
</script>

<style scoped>
.action-tile {
    width: 100%;
    background: #f5f3f3;
    height: 50px;
    font-size: 18px;
    padding: 5px;
}
</style>
