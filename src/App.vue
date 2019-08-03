<template>
    <v-app
            id="inspire"
    >
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
                :color="$store.getters.color"
        >
            <v-list dense>
                <router-link to="/players">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                Players
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>
                <router-link to="/teams">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                Teams
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>

            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                color="red"
                dense
                fixed
                clipped-left
                app
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-icon class="mx-3">fab fa-youtube</v-icon>
            <router-link to="/">
                <v-toolbar-title class="mr-5 align-center">
                    <span class="title">My App</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-layout row align-center style="max-width: 650px">

            </v-layout>

        </v-toolbar>
        <v-content>

            <router-view></router-view>

        </v-content>
    </v-app>
</template>

<script>

    export default {
        components: {},
        methods: {
            sendToSrver() {
                console.log(this.userdata);
            },
            init() {

            }
        },
        created() {
            this.init();
        },
        data: () => ({
            sayi: 2,
            drawer: null,
            userdata: {
                firstName: null,
                lastName: null,
                email: null
            },
            items: [],
            items2: [
                {picture: 28, text: 'Joseph'},
                {picture: 38, text: 'Apple'},
                {picture: 48, text: 'Xbox Ahoy'},
                {picture: 58, text: 'Nokia'},
                {picture: 78, text: 'MKBHD'}
            ]
        }),
        props: {
            source: String
        }
    }
</script>