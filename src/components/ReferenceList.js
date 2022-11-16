export default {
    props: ['parts'],
    template: `<span v-for="part in parts">{{part.Ref}}, </span>`
};
