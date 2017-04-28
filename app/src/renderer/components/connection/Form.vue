<template lang="html">
    <div>
        <div class="columns">
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Driver</label>
                    <p class="control">
                        <span class="select">
                            <select v-model="form.driver">
                                <option value="postgresql">PostgreSQL</option>
                            </select>
                        </span>
                    </p>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">Hostname</label>
                    <p class="control">
                        <input class="input" v-model="form.hostname"/>
                    </p>
                </div>
            </div>
            <div class="column is-2">
                <div class="field">
                    <label for="" class="label">Port</label>
                    <p class="control">
                        <input class="input" v-model="form.port"/>
                    </p>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Database</label>
                    <p class="control">
                        <input class="input" v-model="form.database"/>
                    </p>
                </div>
            </div>
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Username</label>
                    <p class="control">
                        <input class="input" v-model="form.username"/>
                    </p>
                </div>
            </div>
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Password</label>
                    <p class="control">
                        <input type="password" class="input" v-model="form.password"/>
                    </p>
                </div>
            </div>
        </div>

        <div class="field is-grouped is-pulled-right">
            <p class="control">
                <button class="button is-primary">Connect</button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'connection-form',
    data () {
        return {
            form: {
                driver: 'postgresql',
                hostname: 'localhost',
                port: 5432,
                database: 'postgres',
                username: 'postgres',
                password: ''
            }
        }
    }
}
</script>

<style lang="css">
</style>
