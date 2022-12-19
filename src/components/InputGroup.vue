<template>
     <div class="input-group">
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

</style>

