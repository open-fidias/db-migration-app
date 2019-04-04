<template>
    <label class="radio column is-2" @click.prevent="$emit('update-selected')">
        <div class="card is-fullwidth"
            :class="isSelected">
            <div class="card-image">
                <figure class="image is-96x96">
                    <img :src="image()" :alt="value">
                </figure>
            </div>
            <div class="card-content">
                <h3 class="title is-4 has-text-centered capitalize">{{ value }}</h3>
            </div>
        </div>
        <input type="radio" :value="value">
    </label>
</template>

<script>
export default {
    name: 'driver-select',
    props: {
        value: {
            type: String,
            required: true
        },
        selectedValue: {
            type: String,
            required: true
        }
    },
    computed: {
        isSelected () {
            return {
                'radio--selected': this.value === this.selectedValue
            }
        }
    },
    methods: {
        image () {
            return require(`./img/${this.value}_icon.png`)
        }
    }
}
</script>

<style scoped>
label.radio > input {
    z-index: -1;
    opacity: 0;
}
.card {
    border: 2px solid transparent;
}
.radio--selected {
    border: 2px solid #3273dc;
}
figure.image {
    padding: 16px;
    margin: 0 auto;
}
</style>
