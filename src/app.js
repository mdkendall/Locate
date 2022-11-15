const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            title: 'Locater',
            parts: [],
            uniqValues: [],
            selectedValue: ""
        }
    },
    methods: {
        loadParts(partText) {
            this.parts = $.csv.toObjects(partText);
            for (part of this.parts) {
                if (!this.uniqValues.includes(part.Description)) this.uniqValues.push(part.Description);
            }
        },
        selectedParts() {
            return this.parts.filter(part => {return part.Description == this.selectedValue;});
        }
    },
    mounted() {
        fetch('parts.csv').then(res => res.text()).then(text => this.loadParts(text));
    }
});

app.mount('#app');
