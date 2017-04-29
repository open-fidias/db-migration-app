<template lang="html">
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <versions></versions>
            </div>
        </div>
    </footer>
</template>

<script>
import Versions from 'components/main/Versions'

export default {
    name: 'main-footer',
    components: {
        Versions
    }
}
</script>

<style lang="css">
</style>
