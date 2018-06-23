<template>
    <p v-once>
        You are using electron {{ versions['electron'] }}
        with node {{ versions.node }} on the {{ platform }} platform.
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
