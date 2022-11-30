export default {
    props: ['parts', 'img', 'flip'],
    template: `
        <svg :viewBox="img.left.toString()+' '+img.bottom.toString()+' '+img.width.toString()+' '+img.height.toString()">
            <image :x="img.left" :y="img.bottom" :width="img.width" :height="img.height" :href="img.data" />
            <g :transform="'translate(0,'+(2*img.bottom+img.height).toString()+') scale(1,-1)'">
                <g :transform="flip ? 'translate('+(2*img.left+img.width).toString()+',0) scale(-1,1)' : ''">
                    <circle v-for="part in parts" :cx="part.X" :cy="part.Y" r="1" stroke="red" stroke-width="0.5" fill="yellow" opacity="0.5"/>
                </g>
            </g>
        </svg>`
};
