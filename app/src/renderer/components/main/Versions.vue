<template>
    <p v-once>
        You are using electron v{{ versions['atom-shell'] }}
        with node v{{ versions.node }} on the {{ platform }} platform.
    </p>
</template>

<script>
import os from 'os'

export default {
    name: 'versions',
    data () {
        return {
            platform: os.platform(),
            versions: process.versions
        }
    }
}
</script>
