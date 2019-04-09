<template>
    <div class="driver-select-container columns">
        <DriverSelect v-for="item in availableDrivers"
            :key="item"
            :value="item"
            :selected-value="driver"
            @update-selected="$emit('update-selected', item)"
        ></DriverSelect>
    </div>
</template>

<script>
import DriverSelect from './DriverSelect'
import { AVAILABLE_DRIVERS } from 'database/driver'

export default {
    name: 'connection-driver',
    components: {
        DriverSelect
    },
    props: {
        driver: {
            type: String,
            required: true,
            validator: function (value) {
                return AVAILABLE_DRIVERS.indexOf(value) !== -1
            }
        }
    },
    computed: {
        availableDrivers () {
            return AVAILABLE_DRIVERS
        }
    }
}
</script>

<style scoped>
.driver-select-container {
    display: flex;
    justify-content: center;
    align-content: space-around;
    align-items: stretch;
    flex-wrap: wrap;
}
</style>

