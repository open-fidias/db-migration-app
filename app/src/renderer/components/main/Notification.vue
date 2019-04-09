<template lang="html">
    <div class="notification" v-show="isVisible"
        :class="[modifier]">
        <button class="delete"
            @click.prevent="$emit('close')"></button>
        <div class="notification-message" v-html="message"></div>
        <button class="button is-outlined is-inverted"
            :class="[modifier]"
            @click.prevent="showStack = !showStack"
            v-if="stack">
            Details
        </button>
        <div v-show="showStack" class="notification-stack"><pre>{{ stack }}</pre></div>
    </div>
</template>

<script>
export default {
    name: 'notification',
    props: {
        modifier: {
            type: String,
            default: ''
        },
        isVisible: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            required: true
        },
        stack: String
    },
    data () {
        return {
            showStack: false
        }
    }
}
</script>

<style scoped>
.notification-message {
    margin-bottom: 10px;
}
.notification-stack {
    margin-top: 10px;
}
.notification-stack pre {
    padding: 10px;
    border-radius: 6px;
}
</style>
