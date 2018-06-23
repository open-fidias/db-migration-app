<template lang="html">
    <span class="tag" :class="connectionStatusStyle">
        {{ connectionStatus }}
    </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'connection-status',
    computed: {
        ...mapGetters([
            'connectionStatus',
            'connectionStatusStyle'
        ])
    }
}
</script>
