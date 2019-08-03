<template>
    <div>
        <baslik label="Oyuncular"></baslik>

        <h2 v-if="players.length == 0">Kayıt Yok</h2>

        <v-combobox @change="listeYennile">

        </v-combobox>


        <v-data-table
                v-if="players.length>0"
                :headers="headers"
                :items="items"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import baslik from '../components/baslik';

    export default {
        components: {baslik},
        name: "Players",

        data() {
            return {
                headers: [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {text: 'Calories', value: 'calories'},
                    {text: 'Fat (g)', value: 'fat'},
                    {text: 'Carbs (g)', value: 'carbs'},
                    {text: 'Protein (g)', value: 'protein'},
                    {text: 'Iron (%)', value: 'iron'}
                ],
                items: [],
                players: []
            }
        },
        created() {
            this.init();

        },
        methods: {
            listeYennile() {

            },
            init() {
                console.log(this.$route);
                if (this.$route.params.hasOwnProperty('takim_id')) {
                    this.$axios.get('http://kendinal.lcl/players').then(response => {

                    })
                } else {
                    this.$axios.get('http://kendinal.lcl/players').then(response => {

                    })
                }
            }
        }

    }
</script>

<style scoped>

</style>