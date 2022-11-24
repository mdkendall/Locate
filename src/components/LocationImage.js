export default {
    props: ['parts'],
    template: `
        <svg height="768" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">
            <image width="100" height="115" href="tas.png" />
            <g transform="translate(0,115) scale(1,-1)">
                <circle v-for="part in parts" :cx="part.X" :cy="part.Y" r="1" stroke="red" stroke-width="0.5" fill="yellow" opacity="0.5"/>
            </g>
        </svg>`
};
