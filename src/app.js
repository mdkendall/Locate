import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            title: 'Locator',
            parts: [],
            uniqValues: [],
            selectedValue: ""
        }
    },
    computed: {
        selectedParts() {
            return this.parts.filter(part => {return part.Description == this.selectedValue;});
        }
    },
    methods: {
        loadParts(partText) {
            this.parts = $.csv.toObjects(partText);
            console.log(this.parts);
            for (var part of this.parts) {
                if (!this.uniqValues.includes(part.Description)) this.uniqValues.push(part.Description);
            }
        },
    },
    mounted() {
        fetch('parts.csv').then(res => res.text()).then(text => this.loadParts(text));
    }
});

app.mount('#app');
