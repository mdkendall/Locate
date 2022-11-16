export default {
    props: ['modelValue', 'items'],
    emits: ['update:modelValue'],
    template: `
        <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
            <option disabled value="">Select a value</option>
            <option v-for="item in items" :value="item">{{item}}</option>
        </select>`
};
