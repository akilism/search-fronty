/*
<template v-if="items.length > 0">
  <h2>{{ title }}</h2>
  <ul class="icon-list">
    <li v-for="item in items" v-on:click.prevent="search(item)">
      <img v-bind:src="item.thumbnail_url" class="icon">
      {{ item.name }}
    </li>
  </ul>
</template>
*/

<script>
  export default {
    methods: {
      search: function (item) {
        this.$dispatch(item.searchType, item);
      }
    },
    props: {
      'title': {
        required: true,
        type: String
      },
      'items': {
        required: true,
        type: Array
      }
    }
  }
</script>

<style>
  h2 {
    width: 100vw;
  }

  .icon-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid black;
  }

  .icon-list li {
    flex: 1;
    margin: 5px;
    white-space: nowrap;
    cursor: pointer;
    padding: 5px;
    font-size: 18px;
  }

  .icon-list li .icon {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: block;
    border: 1px solid #4d4d4d;
    margin: 0 auto;
  }

</style>
