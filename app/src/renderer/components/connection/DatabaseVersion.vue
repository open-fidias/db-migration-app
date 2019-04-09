<template lang="html">
    <span class="tag is-light">{{ databaseName }} {{ databaseVersion }}</span>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'database-version',
    computed: {
        ...mapGetters([
            'databaseVersion',
            'databaseName'
        ])
    }
}
</script>
