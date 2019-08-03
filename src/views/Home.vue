<template>
    <div>
        <v-btn @click="detayver">Hangi Tarih?</v-btn>
        <tarih v-model="tarihler.tarihVade" label="Vade Tarihi"></tarih>
        <tarih v-model="tarihler.tarihTanzim" label="Tanzim Tarihi"></tarih>
        <tarih v-model="tarihler.tarihTahsilat" label="Tahsilat Tarihi"></tarih>
        <v-btn @click="del">sil</v-btn>
    </div>
</template>

<script>
    import tarih from '../components/tarih';

    export default {
        components: {tarih},
        data() {
            return {
                tarihler: {

                    tarihVade: "2019-01-01",
                    tarihTanzim: "2019-02-02",
                    tarihTahsilat: "2019-03-03",

                }
            }
        },
        methods: {
            detayver() {
                console.log(this.tarihler);
            },
            del(){
               this.$store.commit('askDelete',()=>{
                   this.$axios.delete('/kayit/row_id').then(()=>{
                       this.$store.commit('alert',"Silindi");
                   })
               });
            }
        }

    }
</script>
