<template lang="html">
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered">
                <versions></versions>
                <p>
                    Migrations powered by
                    <a href="https://github.com/guidesmiths/marv">marv</a>
                </p>
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
