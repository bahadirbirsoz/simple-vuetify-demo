<template>
    <div>

        <baslik></baslik>
        <v-flex>


            <v-spacer></v-spacer>
            <v-btn color="light-green lighten-3" @click="openAddDialog">Yeni Takım

            </v-btn>

        </v-flex>
        <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.team }}</td>
                <td class="text-xs-right">{{ props.item.strength }}</td>
                <td class="text-xs-right">{{ datetimeFormat(props.item.created_at) }}</td>
                <td class="text-xs-right">{{ datetimeFormat(props.item.updated_at) }}</td>

                <td>
                    <v-btn @click="openEditDailog(props.item)">Düzenle</v-btn>
                    <v-btn color="red" dark @click="openDeleteDailog(props.item)">Sil</v-btn>
                    <router-link :to="`/players/${props.item.id}`">
                        <v-btn color="red" dark>Players</v-btn>
                    </router-link>
                </td>

            </template>
        </v-data-table>
        <v-dialog
                v-model="deleteDialog"
                width="500"
        >
            <v-card>
                <v-toolbar color="red" dark>
                    Emin Misiniz
                </v-toolbar>
                <v-card-text>
                    <p>Seçili kayıt kalıcı olarak silinecektir. Devam etmek istediğinize emin misiniz?</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="red"
                            flat
                            @click="cancelDelete()"
                    >
                        İptal
                    </v-btn>
                    <v-btn
                            color="primary"
                            flat
                            @click="deleteItem()"
                    >
                        Sil
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="editDialog"
                width="500"
        >
            <v-card>
                <v-toolbar color="indigo" dark>
                    Takım Bilgileri
                </v-toolbar>
                <v-card-text>
                    <v-flex md12>
                        <v-text-field
                                label="Takım"
                                v-model="editingItem.team"
                        ></v-text-field>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="red"
                            flat
                            @click="cancel()"
                    >
                        İptal
                    </v-btn>
                    <v-btn
                            color="primary"
                            flat
                            @click="save()"
                    >
                        Kaydet
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </div>
</template>

<script>
    import baslik from '../components/baslik';

    export default {
        name: "Teams",
        components: {baslik},
        data() {
            return {
                editingItem: {
                    team: "test"
                },
                deleteIndex: null,
                editingIndex: null,
                deleteDialog: false,
                editDialog: false,
                headers: [
                    {
                        text: 'ID',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    }, {
                        text: 'Team',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Strength',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    }, {
                        text: 'Created At',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    }, {
                        text: 'Updated At',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                ],
                items: [],
                title: "Title",

            }
        },
        created() {
            this.initialize();
        },
        methods: {
            playerListUrl(item) {
                return '/players/' + item.id;
            },
            initialize() {
                var that = this;
                this.$axios.get('http://kendinal.lcl/teams').then((response) => {
                    this.items = response.data;
                })
            },
            datetimeFormat(str) {
                if (!str) {
                    return "-";
                }
                let dateObj = new Date(Date.parse(str))
                return dateObj.toDateString();
            },

            openAddDialog() {
                this.editDialog = true;
                this.editingItem = {};
                this.editingIndex = null;
                console.log("open click oldu");
            },
            openEditDailog(item) {
                this.editDialog = true;
                this.editingIndex = this.items.indexOf(item);
                Object.assign(this.editingItem, item);
            },
            openDeleteDailog(item) {
                this.deleteDialog = true;
                this.deleteIndex = this.items.indexOf(item);
            },
            cancel() {
                this.editDialog = false;
            },
            cancelDelete() {
                this.deleteDialog = false;
            },
            deleteItem() {
                this.$axios.delete('http://kendinal.lcl/team/' + this.items[this.deleteIndex].id).then(response => {
                    this.items.splice(this.deleteIndex, 1);
                    this.deleteDialog = false;
                });
            },
            save() {
                if (this.editingItem.id) {
                    this.$axios.put('http://kendinal.lcl/team/' + this.editingItem.id, this.editingItem).then(response => {
                        Object.assign(this.items[this.editingIndex], response.data);
                    });
                } else {
                    this.$axios.post('http://kendinal.lcl/team', this.editingItem).then(response => {
                        this.items.push(response.data);
                    });
                }
                this.editDialog = false;
            }


        }
    }
</script>

<style scoped>
    h1 {
        color: #33cc99
    }
</style>