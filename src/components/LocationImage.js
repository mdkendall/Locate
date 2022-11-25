export default {
    props: ['parts', 'img'],
    template: `
        <svg height="768" :viewBox="img.left.toString()+' '+img.bottom.toString()+' '+img.width.toString()+' '+img.height.toString()">
            <image :width="img.width" :height="img.height" :href="img.name" />
            <g transform="translate(0,115) scale(1,-1)">
                <circle v-for="part in parts" :cx="part.X" :cy="part.Y" r="1" stroke="red" stroke-width="0.5" fill="yellow" opacity="0.5"/>
            </g>
        </svg>`
};
