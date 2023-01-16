<template>
    <div class="datatable-container">
        <table>
            <thead>
                <th v-for="field in textFields" :key="field.name">
                    {{ $t(field.name) }}
                </th>
            </thead>
            <tbody>
                <tr v-for="register in registers.data" :key="register">
                    <td v-for="field in textFields" :key="field">
                        {{ register[field.field] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Datatable',
    props: {
        registers: Object,
        identifier: String,
        textFields: Array
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

.datatable-container {
    width: 100%;
}

table {
    border-collapse: collapse;
    transition: .2s ease-in-out;
    width: 100%;

    thead {
        th {
            text-align: left;
            padding: 0.5rem;
            color: $dark_gray;
            border-bottom: 1px solid $gray;
        }
    }

    tbody {
        tr {
            border-bottom: 1px solid $dark_white;
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

