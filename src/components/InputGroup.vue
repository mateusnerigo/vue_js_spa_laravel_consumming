<template>
     <div
        class="input-group"
        :class="width"
     >
        <label :for="name">{{ label }}</label>
        <input
            :type="type"
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"
            @input="updateValue"
        >
    </div>
</template>

<script>
export default {
    name: 'InputGroup',
    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        modelValue: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: 'lg'
        }
    },

    emits: ['update:modelValue'],

    methods: {
        updateValue(event){
            this.$emit('update:modelValue', event.target.value);
        }
    },

}
</script>

<style lang="scss" scoped>
@import '/src/scss/variables.scss';

.input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    &.sm {
        width: 23.5%;
    }

    &.md {
        width: 48.5%;
    }

    &.lg {
        width: 100%;
    }


    label {
        font-size: 0.75rem;
        padding-top: .25rem;
        padding-bottom: .25rem;
        color: $dark_gray;
    }

    input {
        width: 100%;
        background-color: transparent;
        border-bottom: 1.5px solid $gray;
        font-size: 0.85rem;
        border-radius: 0;
        padding: .25rem 0 .25rem;

    }
}
</style>

