<template>
      <div>
        <h1>params:{{$route.params.searchStr}}</h1>
        <h1>query: {{$route.query.k}}</h1>
        <h1>props: {{searchStr}}</h1>
        <h1>props: {{k}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Search',
    props: ['searchStr','k']
}
</script>

<style>

</style>