<template>
     <div
        class="input-group"
        :class="this.width"
     >
        <label :for="this.name">{{ this.label }}</label>
        <input
            :type="this.type"
            :readonly="this.readonly"
            :name="this.name"
            :id="this.id"
            :placeholder="this.placeholder"
            :value="this.modelValue"
            @input="this.updateValue"
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
        readonly: {
            type: Boolean,
            default: false
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

        &:read-only {
            border: none;
        }
    }
}
</style>

