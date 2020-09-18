<template>
    <div class="hot">
        <dl>
            <dt>{{ title }}：</dt>
            <dd v-for="(item) in list" :key="item.id">
                {{ item.name }}
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
    props:['title','list']
}
</script>
<style lang="scss">
    @import '@/assets/css/changecity/hot.scss';
</style>