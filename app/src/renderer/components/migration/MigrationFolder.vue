<template lang="html">
    <div class="columns">
        <div class="column">
            <label for="" class="label">Choose Migration folder</label>
            <div class="field has-addons">
                <p class="control is-expanded">
                    <input type="text" class="input" readonly="readonly"
                        v-model="getMigrationsFolder"/>
                </p>
                <p class="control">
                    <button class="button is-info"
                        @click.prevent="chooseFolder">
                        Browse...
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { remote } from 'electron'
import { EventBus } from 'renderer/event-bus'
import settings from 'electron-settings'

const dialog = remote.dialog

export default {
    name: 'migration-folder',
    mounted () {
        settings.get('migrations.folder')
            .then(folder => {
                this.setupMigrationFolder(folder)
            })
    },
    methods: {
        chooseFolder () {
            dialog.showOpenDialog({
                title: 'Choose Migrations folder...',
                properties: ['openDirectory']
            }, (filenames) => {
                if (filenames) {
                    this.setupMigrationFolder(filenames[0])
                }
            })
        },
        setupMigrationFolder (folder) {
            this.$store.dispatch('setMigrationsFolder', folder)
            EventBus.$emit('scan-migrations-folder')
        }
    },
    computed: {
        ...mapGetters([
            'getMigrationsFolder'
        ])
    }
}
</script>

<style lang="css">
</style>
