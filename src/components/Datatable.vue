<template>
    <div class="datatable-container">
        <div class="table-filters-container">
            <div class="filter-results-container">
                <select class="filters-results" v-model="this.perPageField">
                    <option value="10" selected>10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div class="results-per-page-text">
                    {{ $t('resultsPerPage') }}
                </div>
            </div>

            <div class="search-box">
                <span class="material-icons">search</span>
                <input
                    type="text"
                    :placeholder="$t('search')"
                    v-model="this.searchField"
                >
            </div>
        </div>

        <table>
            <thead>
                <th
                    v-for="field in textFields"
                    :key="field.name"
                    :class="`datatable-${field.name}-header`"
                >
                    {{ $t(field.name) }}
                </th>

                <th class="datatable-actions-header">
                    {{ $t('actions') }}
                </th>
            </thead>
            <tbody>
                <tr v-for="register in registers.data" :key="register">
                    <td v-for="field in textFields"
                        :key="field"
                        :class="`datatable-${field.name}-data`"
                    >
                        {{ register[field.field] }}
                    </td>
                    <td>
                        <template v-if="register.isActive">
                            <IconButton :icon="'edit'" :text="'edit'" @click="$parent.showModal('edit')"/>
                            <IconButton :icon="'close'" :text="'deactivate'" @click="$parent.showConfirmModal(register, 'deactivate')" />
                        </template>

                        <template v-else>
                            <IconButton :icon="'visibility'" :text="'view'" />
                            <IconButton :icon="'done'" :text="'activate'" @click="$parent.showConfirmModal(register, 'activate')" />
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="table-listing-container">
            <div class="results-count-container">
                {{ $t('Showing')}} <b>{{ registers.from }}</b>
                {{ $t('to') }} <b>{{ registers.to }}</b>
                {{ $t('from') }} <b>{{ registers.total }}</b> {{ $t('registers') }}
            </div>

            <div class="results-pages-container">
                <button
                    v-for="n in registers.last_page"
                    :class="`${n == registers.current_page && 'actual-page'}`"
                    class="pages-available"
                    @click="updatePageDataTable(n)"
                >
                    {{ n }}
                </button>
            </div>
        </div>
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
    },

    components: {
        IconButton
    },

    data() {
        return {
            perPageField: 10,
            searchField: '',
            actualPage: 1
        }
    },

    created() {
        this.updatePageDataTable(1);
    },

    updated() {
        this.handleDatatableStatus();

        if (this.registers.current_page > this.registers.last_page) {
            this.updatePageDataTable(1);
        }
    },

    watch: {
        perPageField(newPerPage) {
            this.$parent.updateDtPerPage(newPerPage);
        },

        searchField(newSearch) {
            this.$parent.updateDtSearch(newSearch);
        },
    },

    methods: {
        updatePageDataTable(newPage) {
            this.$parent.updateDtPage(newPage);
        },

        handleDatatableStatus() {
            document
                .querySelectorAll('.datatable-status-data')
                .forEach(statusElement => {
                    let status = statusElement.innerText;
                    statusElement.innerHTML = `
                        <div class="datatable-status datatable-status-${(status == 0) ? 'inactive' : 'active'}"></div>
                    `;
                });

            document
                .querySelectorAll('.datatable-status')
                .forEach(datatableStatusElement => {
                    let statusStyle = datatableStatusElement.style;
                    statusStyle.height = '1rem';
                    statusStyle.width = '1rem';
                    statusStyle.padding = '0';
                    statusStyle.borderRadius = '50%';

                    let statusClassList = datatableStatusElement.classList
                    if (statusClassList.contains('datatable-status-active')) {
                        statusStyle.background = '#33d9b2';
                    } else if (statusClassList.contains('datatable-status-inactive')) {
                        statusStyle.background = '#ff5252';
                    }


                })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

.datatable-container {
    width: 100%;

    .table-filters-container,
    .table-listing-container {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 2rem 0 1rem;
        flex: 1 1;
    }

    .table-filters-container {
        .filter-results-container,
        .search-box {
            display: flex;
            flex-wrap: nowrap;
            flex: 1;
        }

        .filter-results-container {
            justify-content: start;
            align-items: center;

            .filters-results {
                width: 3.5rem;
                text-align: right;
            }

            .results-per-page-text {
                font-size: 0.75rem;
                margin-left: 0.5rem;
            }
        }

        .search-box {
            justify-content: end;
            align-items: center;
            position: relative;

            .material-icons {
                position: absolute;
                background: white;
                padding: 0.5rem 0;
                color: $gray;
                right: 5px;
                user-select: none;
                pointer-events: none;
            }

            input {
               width: 15rem;
            }
        }
    }

    .table-listing-container {
        font-size: 0.85rem;
        padding: 0.5rem 0;
        border-top: 1px solid $dark_white;

        .actual-page {
            background-color: $purple;
        }
    }

    table {
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
                border-bottom: 1px solid $dark_white;

                &.datatable-actions-header {
                    width: 8rem;
                }
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
                    padding: 0.15rem 0.5rem;
                }
            }
        }
    }

}

</style>

