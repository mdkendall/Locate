import ReferenceList from "./components/ReferenceList.js";
import LocationImage from "./components/LocationImage.js";
import Selector from "./components/Selector.js";

export default {
    components: {
        ReferenceList: ReferenceList,
        LocationImage: LocationImage,
        Selector: Selector
    },
    data() {
        return {
            title: 'placto',
            parts: [],
            uniqValues: [],
            selectedValue: "",
            uniqLayers: [],
            selectedLayer: ""
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
            for (var part of this.parts) {
                if (!this.uniqLayers.includes(part.Layer)) this.uniqLayers.push(part.Layer);
            }
        },
    },
    mounted() {
        fetch('parts.csv').then(res => res.text()).then(text => this.loadParts(text));
    }
};
