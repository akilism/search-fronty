/*
<template v-if="items.length > 0">
  <h2>{{ title }}</h2>
  <ul class="button-list">
    <li v-for="item in items" v-on:click.prevent="search(item)">
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

  .button-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid black;
  }

  .button-list li {
    flex: 1;
    margin: 5px;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 2px;
    background-color: #dfdfdf;
    padding: 5px;
    font-size: 12px;
    transition: all 200ms;
  }

  .button-list li:hover {
    background-color: #D8DBFB;
    transform: scale(1.5);
  }
</style>
