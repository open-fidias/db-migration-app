<template lang="html">
    <span class="tag is-light">PostgreSQL {{ postgresqlVersion }}</span>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'postgresql-version',
    computed: {
        ...mapGetters([
            'postgresqlVersion'
        ])
    }
}
</script>
