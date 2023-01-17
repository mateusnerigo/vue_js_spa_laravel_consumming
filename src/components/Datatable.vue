<template>
    <div class="datatable-container">
        <table>
            <thead>
                <th v-for="field in textFields" :key="field.name">
                    {{ $t(field.name) }}
                </th>

                <th v-if="actionButtons.length">
                    {{ $t('actions') }}
                </th>
            </thead>
            <tbody>
                <tr v-for="register in registers.data" :key="register">
                    <td v-for="field in textFields" :key="field">
                        {{ register[field.field] }}
                    </td>
                    <td>
                        <IconButton
                            v-for="actionButton in actionButtons"
                            :key="actionButton.name"

                            :icon="actionButton.icon"
                            :text="actionButton.name"
                            :active="register.isActive"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import IconButton from './IconButton.vue';

export default {
    name: 'Datatable',
    props: {
        registers: Object,
        identifier: String,
        textFields: Array,
        actionButtons: {
            type: Array,
            default: [
                {'name': 'view', 'icon': 'visibility'},
                {'name': 'edit', 'icon': 'edit'},
                {'name': 'activate', 'icon': 'done'},
                {'name': 'deactivate', 'icon': 'close'},
                {'name': 'remove', 'icon': 'delete'}
            ]
        }
    },
    components: {
        IconButton
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';
@import '/src/scss/fonts.scss';


.datatable-container {
    width: 100%;
}

table {
    // font-family: 'Poppins', sans-serif;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.9rem;
    border-collapse: collapse;
    transition: .2s ease-in-out;
    width: 100%;

    thead {
        th {
            text-transform: capitalize;
            text-align: left;
            padding: 0.5rem;
            color: $dark_gray;
            border-bottom: 1px solid $gray;
        }
    }

    tbody {
        tr {
            // border-bottom: 1px solid $dark_white;
            transition: .2s ease-in-out;

            &:hover {
                background-color: $transparent_dark_white;
            }

            td {
                color: $dark_gray;
                padding: 0.5rem;
            }
        }
    }
}
</style>

