/*
<template>
  <div class="search-box">
    <input  v-on:keyup.enter="submit" v-model="searchTerm" placeholder="Search fool.">
    <button v-on:click.prevent="submit" name="submitSearch">Search</button>
  </div>
</template>
*/

<script>
export default {
  data () {
    return {
      searchTerm: ''
    }
  },
  methods: {
    submit: function () {
      this.$dispatch('search-submit', this.searchTerm);
    }
  }
}
</script>
