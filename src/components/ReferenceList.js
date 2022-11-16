export default {
    props: ['parts'],
    template: `<div><span v-for="part in parts">{{part.Ref}}, </span></div>`
};
