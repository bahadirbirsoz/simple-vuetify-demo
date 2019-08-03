<template>
    <div>
        {{label}} : <input ref="tarih" :value="value" @input="update">
    </div>
</template>

<script>
    export default {
        props: ['value', 'label'],
        name: "tarih",

        methods: {
            update() {
                this.$emit('input', this.$refs.tarih.value)
            }
        }

    }
</script>

<style scoped>

</style>