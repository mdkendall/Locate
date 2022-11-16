import ReferenceList from "./components/ReferenceList.js";
import LocationImage from "./components/LocationImage.js";

export default {
    components: {
        ReferenceList: ReferenceList,
        LocationImage: LocationImage
    },
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
            for (var part of this.parts) {
                if (!this.uniqValues.includes(part.Description)) this.uniqValues.push(part.Description);
            }
        },
    },
    mounted() {
        fetch('parts.csv').then(res => res.text()).then(text => this.loadParts(text));
    }
};
