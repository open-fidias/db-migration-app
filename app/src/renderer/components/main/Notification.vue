<template lang="html">
    <div class="notification" v-show="isVisible"
        :class="[modifier]">
        <button class="delete"
            @click.prevent="$emit('close')"></button>
        {{ message }}
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
        }
    }
}
</script>

<style lang="css">
</style>
