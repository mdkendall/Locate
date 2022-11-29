export default {
    props: ['parts'],
    template: `<div v-if="parts.length > 0">Qty: {{ parts.length }} Refs: {{ parts.map(a=>a.Ref).join(', ') }}</div>`
};
