export default {
    props: ['parts'],
    template: `<div>{{ parts.map(a=>a.Ref).join(', ') }}</div>`
};
