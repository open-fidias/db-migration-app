<template lang="html">
    <section class="section">
        <migration-folder></migration-folder>
        <migration-list></migration-list>
        <p>Showing only the last 50</p>
    </section>
</template>

<script>
import MigrationFolder from 'components/migration/MigrationFolder'
import MigrationList from 'components/migration/MigrationList'

export default {
    name: 'migration-content',
    components: {
        MigrationFolder,
        MigrationList
    }
}
</script>
