<template>
    <v-layout row>
        <v-flex xs12 class="navdata__wrapper">
            <h1>Navdata page</h1>
            <v-flex xs4 offset-xs4>
                <v-list dense>
                    <v-list-tile>
                        <v-list-tile-action>
                            kalmanPressure.offsetPressure
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{ droneNavdata.kalmanPressure.offsetPressure }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            kalmanPressure.estimated.velocity
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{ droneNavdata.kalmanPressure.estimated.velocity }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            kalmanPressure.estimated.covariance.alt
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{ droneNavdata.kalmanPressure.estimated.covariance.alt }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            kalmanPressure.estimated.covariance.pwm
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{ droneNavdata.kalmanPressure.estimated.covariance.pwm }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            kalmanPressure.estimated.covariance.velocity
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{ droneNavdata.kalmanPressure.estimated.covariance.velocity }}
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            kalmanPressure.estimated.sum
                        </v-list-tile-action>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            {{ droneNavdata.kalmanPressure.estimated.sum }}
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
import { DroneNavData } from '../../Helpers/DroneNavdata';
import { mapGetters } from 'vuex';

@Component({
    computed: {
        ...mapGetters({
            droneNavdata: 'droneNavdata'
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
