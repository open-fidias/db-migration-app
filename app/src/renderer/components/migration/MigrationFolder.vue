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
                    <button class="button is-info" @click.prevent="chooseFolder">
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

const dialog = remote.dialog

export default {
    name: 'migration-folder',
    methods: {
        chooseFolder () {
            dialog.showOpenDialog({
                title: 'Choose Migrations folder...',
                properties: ['openDirectory']
            }, (filenames) => {
                if (filenames) {
                    this.$store.commit('setMigrationsFolder', filenames[0])
                }
            })
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
