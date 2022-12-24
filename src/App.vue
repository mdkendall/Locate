<script>
import ReferenceList from "./components/ReferenceList.vue";
import LocationImage from "./components/LocationImage.vue";
import Selector from "./components/Selector.vue";

export default {
    components: {
        ReferenceList: ReferenceList,
        LocationImage: LocationImage,
        Selector: Selector
    },
    data() {
        return {
            title: 'Locator',
            selectedTab: 'setup',
            parts: [],
            uniqValues: [],
            selectedValue: "",
            uniqLayers: [],
            selectedLayer: "",
            assy: {data: "", left: 0, bottom: 0, width: 100, height: 100}
        }
    },
    computed: {
        selectedParts() {
            return this.parts.filter(part => {
                return part.Description == this.selectedValue &&
                    part.Layer == this.selectedLayer;
            });
        },
        assyFlip() {
            return this.selectedLayer.toLowerCase().includes('bot');
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
        dropParts(event) {
            var reader = new FileReader();
            var loader = this.loadParts;
            reader.readAsText(event.dataTransfer.items[0].getAsFile());
            reader.onloadend = function() {
                loader(reader.result);
            }
        },
        loadAssy(assyData) {
            this.assy.data = assyData;
        },
        dropAssy(event) {
            var reader = new FileReader();
            var loader = this.loadAssy;
            reader.readAsDataURL(event.dataTransfer.items[0].getAsFile());
            reader.onloadend = function() {
                loader(reader.result);
            }
        }
    },
    mounted() {
    }
};
</script>

<template>
    <div class="container">
        <div class="row"><div class="col"><h2><img src="./logo.png" width="80"> {{title}}</h2></div></div>
        <!-- Nav tabs -->
        <div class="row mb-3"><div class="col"><ul class="nav nav-tabs">
            <li class="nav-item"><a class="nav-link" href="#" @click="selectedTab='setup'">Setup</a></li>
            <li class="nav-item"><a class="nav-link" href="#" @click="selectedTab='assembly'">Assembly</a></li>
        </ul></div></div>
        <!-- Setup pane -->
        <div class="row" v-if="selectedTab == 'setup'">
            <div class="col-md-4 mb-3" style="max-width: 18rem">
                <div class="card text-bg-light" @dragover.prevent="" @drop.prevent="dropParts($event)">
                    <div class="card-body">
                        <h5 class="card-title"><img src="./assets/img/filetype-csv.svg" width="32"/> Parts List</h5>
                        <p class="card-text">Drag parts list here. One row per part. Columns must include Ref, Description, X, Y and Layer.</p>
                        <p v-if="parts.length > 0">Loaded {{parts.length}} parts with {{uniqValues.length}} unique values.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3" style="max-width: 18rem">
                <div class="card text-bg-light" @dragover.prevent="" @drop.prevent="dropAssy($event)">
                    <div class="card-body">
                        <h5 class="card-title"><img src="./assets/img/filetype-png.svg" width="32"/> Assembly Drawing</h5>
                        <p class="card-text">Drag assembly drawing here. PNG or JPG format. Cropped to board extents.</p>
                        <img v-if="assy.data.length > 0" style="max-width: 12rem" class="mb-3" :src="assy.data" />
                        <form v-if="assy.data.length > 0 && parts.length > 0" class="row">
                            <label class="col-form-label col-6">Layer</label><selector class="form-select col" v-model="selectedLayer" :items="uniqLayers"></selector>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3" style="max-width: 18rem">
                <div class="card text-bg-light">
                    <div class="card-body">
                        <h5 class="card-title"><img src="./assets/img/aspect-ratio.svg" width="32"/> Board Size</h5>
                        <p class="card-text">Board dimensions in same units as in parts list.</p>
                        <form>
                            <div class="row mb-1"><label class="col-form-label col-6">Left</label><input class="form-control col" type="number" v-model="assy.left"></div>
                            <div class="row mb-1"><label class="col-form-label col-6">Bottom</label><input class="form-control col" type="number" v-model="assy.bottom"></div>
                            <div class="row mb-1"><label class="col-form-label col-6">Width</label><input class="form-control col" type="number" v-model="assy.width"></div>
                            <div class="row mb-1"><label class="col-form-label col-6">Height</label><input class="form-control col" type="number" v-model="assy.height"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Main assmebly drawing pane -->
        <div v-if="selectedTab == 'assembly'">
            <form class="row mb-3">
                <label class="col-form-label col-1">Value</label><selector class="form-select col" style="max-width: 36rem" v-model="selectedValue" :items="uniqValues"></selector>
            </form>
            <div class="row mb-3"><div class="col"><location-image :parts="selectedParts" :img="assy" :flip="assyFlip" style="max-width: 80%; max-height: calc(100vh - 240px)"></location-image></div></div>
            <div class="row mb-3"><div class="col"><reference-list :parts="selectedParts"></reference-list></div></div>
        </div>
    </div>
</template>
