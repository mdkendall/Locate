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
            title: 'Locator',
            parts: [],
            uniqValues: [],
            selectedValue: "",
            uniqLayers: [],
            selectedLayer: "",
            tas: {name: "bas-lpb.png", left: -16.3, bottom: -43.3, width: 32.6, height: 86.6}
        }
    },
    computed: {
        selectedParts() {
            return this.parts.filter(part => {
                return part.Description == this.selectedValue &&
                    part.Layer == this.selectedLayer;
            });
        }
    },
    methods: {
        loadParts(partText) {
            this.parts = $.csv.toObjects(partText);
            this.uniqValues = [];
            for (var part of this.parts) {
                if (!this.uniqValues.includes(part.Description)) this.uniqValues.push(part.Description);
            }
            this.uniqLayers = [];
            for (var part of this.parts) {
                if (!this.uniqLayers.includes(part.Layer)) this.uniqLayers.push(part.Layer);
            }
        },
        dropParts(event, loader) {
            var reader = new FileReader();
            var loader = this.loadParts;
            reader.readAsText(event.dataTransfer.items[0].getAsFile());
            reader.onloadend = function() {
                loader(reader.result);
            }
        }
    },
    mounted() {
    }
};
