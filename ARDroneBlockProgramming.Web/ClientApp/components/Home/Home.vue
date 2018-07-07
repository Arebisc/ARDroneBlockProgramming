<template>
    <div>
        <h1>Home</h1>
        <draggable>

        </draggable>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import draggable from './../types/vuedraggable';


@Component
export default class Home extends Vue {
    @Prop() testArr: Array<object>;

    constructor() {
        super();
        this.testArr = [
        ];
    }
}
</script>

<style>

</style>
