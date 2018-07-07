<template>
    <div>
        <h1>Home</h1>
        <draggable v-model="listA" style="margin-bottom: 50px" :options="{ group: 'sample' }">
            <div v-for="element in listA" :key="element.id">{{ element.name }}</div>
        </draggable>
        <draggable v-model="listB" :options="{ group: 'sample' }">
            <div v-for="element in listB" :key="element.id">{{ element.name }}</div>
        </draggable>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import draggable from 'vuedraggable';


@Component({
    components: {
        draggable
    }
})
export default class Home extends Vue {

    listA: Array<object> = [
            { id: 1, name: 'some'},
            { id: 2, name: 'more'},
            { id: 3, name: 'samples'},
        ];

    listB: Array<object> = [
            { id: 4, name: 'other'},
            { id: 5, name: 'examples'},
        ];
}
</script>

<style>

</style>
