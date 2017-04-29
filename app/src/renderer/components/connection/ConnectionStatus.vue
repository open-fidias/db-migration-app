<template lang="html">
    <span class="tag" :class="style">
        {{ status }}
    </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'connection-status',
    computed: {
        ...mapGetters([
            'isConnected'
        ]),
        style () {
            return this.isConnected ? 'is-success' : 'is-danger'
        },
        status () {
            return this.isConnected ? 'Connected' : 'Disconnect'
        }
    }
}
</script>

<style lang="css">
</style>
