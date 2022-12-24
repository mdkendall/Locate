<script>
    export default {
        props: ['parts']
    };
</script>

<template>
    <div v-if="parts.length > 0">
        Qty: {{ parts.length }} Refs: {{ parts.map(a => a.Ref).join(', ') }}
    </div>
</template>
