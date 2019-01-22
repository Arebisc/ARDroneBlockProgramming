<template>
    <v-layout row>
        <v-flex xs12 class="navdata__wrapper">
            <h1>Navdata page</h1>
            <v-flex xs4 offset-xs4>
                <v-list dense>
                    <v-list-tile>
                        <v-list-tile-action>
                            x
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{ dronePosition.x }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            Y
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{ dronePosition.y }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            z
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{  dronePosition.z }}
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
    computed: {
        ...mapGetters({
            dronePosition: 'dronePosition'
        })
    }
})
export default class Navdata extends Vue {

}
</script>

<style scoped>
.navdata__wrapper {

}
</style>
