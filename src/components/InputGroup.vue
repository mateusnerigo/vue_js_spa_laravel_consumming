<template>
     <div
        class="input-group"
        :class="`${this.width}`"
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
            default: 'md'
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
    margin-bottom: 2rem;
    padding: 0 1rem;

    &.sm {
        width: 15vw;
    }

    &.md {
        width: 32vw;
    }

    &.lg {
        width: 66vw;
    }

    label {
        font-size: 0.75rem;
        padding: .25rem .25rem 0;
        color: $dark_gray;
    }

    input {
        width: 100%;
        background-color: transparent;
        border-bottom: 1.5px solid $gray;
        font-size: 0.85rem;
        padding: 0.5rem
    }
}
</style>

